# Project Structure (features/shared + app as entrypoint)
Note: when using `'`, escape it with &apos;, &#39;, &lsquo;, &rsquo;, etc.

Goal: domain logic and UI live inside `src/features` and `src/shared`. The `src/app` directory acts only as the entrypoint layer (routing, page.tsx, layout.tsx, API handlers) and imports ready-made components/services from features.

## Directory Structure
src/
  app/
    <route>/page.tsx           // entrypoint, imports page component from features
    api/<domain>/route.ts      // handler delegating to services in features/*
    layout.tsx, globals.css
  features/
    <feature>/
      components/              // UI and page components
      services/                // server actions / logic (prisma, S3, fetch)
      contracts/               // optional DTO/validation schemas
      types/                   // domain types
      hooks/                   // feature-specific hooks
  shared/
    components/ui/             // base UI components (shadcn)
    components/                // shared UI components
    hooks/                     // shared hooks
    lib/                       // prisma, auth, s3 clients, config
    utils/                     // generic helpers (slug, formatters, etc.)

## Rules for src/app
- `page.tsx` must be a thin wrapper that imports a page component from `features/<feature>/components` and renders it.
- Dynamic routes (`[username]`, `[workspace]`) must call services from `features/*/services` instead of placing logic in the route.
- `app/api/**/route.ts` must delegate to services in `features/*/services` (no direct prisma/s3/fetch calls).
- Only here we keep Next.js metadata, layout files, and loading/error boundaries.

## Rules for src/features/<feature>
- `components/`:
  - PascalCase filenames.
  - Add &apos;use client&apos; at the top when browser APIs are used.
  - Contains page components imported by routes.
- `services/`:
  - All server logic lives here (Prisma, S3, DB writes).
  - Server actions require &apos;use server&apos; at the top.
- `types/`:
  - Input/output types shared across components and services.
- `contracts/`:
  - Optional DTO/validation schemas.
- `hooks/`:
  - Hooks specific to the feature (global ones go into shared/hooks).
- Tests may live next to files or inside a `__tests__` folder.

## Rules for src/shared
- `components/ui/`:
  - Base UI primitives; domain-agnostic.
- `components/`:
  - Shared UI components (e.g., Threads).
- `hooks/`:
  - Reusable hooks across features.
- `lib/`:
  - Prisma, auth, s3 clients, configs; no domain logic.
- `utils/`:
  - Generic helpers like slug generation, formatting utilities, validators.

## Conventions
- Use `@/*` import alias.
- Naming:
  - Components → PascalCase (e.g., NewWorkspace.tsx)
  - Services/DTOs → kebab-case (e.g., create-new-workspace.ts)
- Browser-dependent files must begin with &apos;use client&apos;.
- Server actions must begin with &apos;use server&apos;.
- One feature = one responsibility; new flow → new folder in features and a page component inside components.

## Examples
- `src/app/sign-in/page.tsx` → imports LoginCardSection from features/auth/components.
- `src/app/workspaces/new/page.tsx` → imports NewWorkspace from features/workspaces/components.
- `src/shared/utils/slug.ts` → generic helper reused in multiple services.

Follow these rules for all new routes/features so that `app/` stays a thin routing layer while domain logic and UI live in `features/` and shared utilities stay inside `shared/`.
