# Struktura projektu (features/shared + app jako entrypoint)

Cel: logika domenowa i UI siedzą w `src/features` oraz `src/shared`. Katalog `src/app` trzyma tylko routing/entrypoint (page.tsx, layout.tsx, API route handlers) i wywołuje gotowe komponenty/serwisy.

## Szkielet katalogów
```
src/
  app/
    <route>/page.tsx           // entrypoint, importuje komponent z features
    api/<domain>/route.ts      // handler woła serwis z features/*
    layout.tsx, globals.css
  features/
    <feature>/
      components/              // UI i „page component” dla routów
      services/                // server actions / logika (prisma, S3, fetch)
      contracts/               // ewentualne DTO/schema walidacji
      types/                   // typy domenowe
      hooks/                   // hooki specyficzne dla feature (opcjonalnie)
  shared/
    components/ui/             // base UI (shadcn)
    components/                // wspólne komponenty (np. Threads)
    hooks/                     // hooki współdzielone
    lib/                       // klienci (prisma, auth, s3), config
    utils/                     // helpery (np. slug)
```

## Zasady dla `src/app`
- `page.tsx` ma być cienkim wrapperem: importuje „page component” z `features/<feature>/components/...` i go renderuje (patrz `app/sign-in/page.tsx`, `app/workspaces/new/page.tsx`).
- Routing dynamiczny (`[username]`, `[workspace]`) powinien wołać serwisy z `features/*/services` zamiast trzymać logikę w pliku routu; serwis zwraca dane, komponent odpowiada za UI.
- `app/api/**/route.ts` też tylko deleguje do serwisów z `features/*/services` (bez bezpośredniego prisma/s3/fetch).
- Tylko tu trzymamy `metadata`, layouty, loading/error boundary dla Next.js.

## Zasady dla `src/features/<feature>`
- `components/`: komponenty w PascalCase, z `use client` gdy potrzebne. Możesz dodawać „page components” (np. `NewWorkspace`) wołane z routów.
- `services/`: logika serwerowa (prisma, S3, zapisy do DB). Gdy kod to server action, dodaj `'use server'` na górze pliku.
- `types/`: typy wejścia/wyjścia (`CreateWorkspaceInput`, `WorkspaceVisibility`, itp.). Importuj je w komponentach i serwisach.
- `contracts/`: opcjonalne schematy walidacji/DTO jeśli potrzebne dla API.
- `hooks/`: hooki tylko dla tego feature; jeśli mają być reużywalne globalnie, przenieś do `shared/hooks`.
- Testy (gdy dodajemy) trzymaj przy plikach (`*.test.ts[x]`) albo w `__tests__` w obrębie feature.

## Zasady dla `src/shared`
- `components/ui`: bazowe klocki UI (button, card, form...). Nie importują logiki domenowej.
- `components/`: współdzielone komponenty z logiką UI (np. `Threads`), dalej bez zależności domenowych.
- `hooks`: uniwersalne hooki używane w wielu feature’ach.
- `lib`: konfiguracja/klienci (prisma, auth, s3). Tu nie ma logiki biznesowej.
- `utils`: helpery (np. `generateSlug`, `ensureUniqueSlug`, `isValidUsername`).

## Konwencje dodatkowe
- Ścieżki importów przez alias `@/*` (patrz `tsconfig.json`).
- Nazewnictwo plików: komponenty w PascalCase (`NewWorkspace.tsx`), serwisy/dto w kebab-case (`create-new-workspace.ts`).
- Pliki, które dotykają przeglądarki (useState, eventy) zaczynają od `'use client'`; serwerowe helpery/serwisy od `'use server'` gdy to server action.
- Jeden feature = jedna odpowiedzialność. Nowe flow → nowy folder w `features/` i page component wywołany z `src/app`.

## Przykłady z repo
- `src/app/sign-in/page.tsx` → tylko `LoginCardSection` z `features/auth/components`.
- `src/app/workspaces/new/page.tsx` → tylko `NewWorkspace` z `features/workspaces/components`.
- `src/shared/utils/slug.ts` → helper ogólny; używany w `features/workspaces/services/create-new-workspace.ts`.

Trzymaj się tych zasad przy nowych routach/feature’ach, żeby `app/` pozostało wyłącznie warstwą routingu, a logika i UI żyły w `features/` + współdzielone klocki w `shared/`.
