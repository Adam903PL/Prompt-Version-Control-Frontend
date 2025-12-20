'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { ScrollArea } from '@/shared/components/ui/scroll-area';

export function DocsSidebar() {
  const pathname = usePathname();

  const items = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Introduction', href: '/docs' },
        { title: 'Installation', href: '/docs#installation' },
        { title: 'Configuration', href: '/docs#configuration' },
      ],
    },
    {
      title: 'Commands',
      items: [
        { title: 'init', href: '/docs#init' },
        { title: 'update-conv', href: '/docs#update-conv' },
        { title: 'remote', href: '/docs#remote' },
        { title: 'generate', href: '/docs#generate' },
        { title: 'watch', href: '/docs#watch' },
        { title: 'login', href: '/docs#login' },
        { title: 'push', href: '/docs#push' },
        { title: 'risk', href: '/docs#risk' },
      ],
    },
  ];

  return (
    <div className="hidden lg:block w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl h-[calc(100vh-4rem)] sticky top-16">
      <ScrollArea className="h-full py-6 pr-6 pl-4">
        {items.map((section, index) => (
          <div key={index} className="mb-6">
            <h4 className="mb-2 text-sm font-semibold tracking-tight text-white/90">
              {section.title}
            </h4>
            <div className="grid gap-1 text-sm">
              {section.items.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className={cn(
                    'block px-2 py-1.5 transition-colors hover:text-white',
                    pathname === item.href ||
                      (item.href.includes('#') &&
                        pathname === item.href.split('#')[0]) // Simple active check, ideally would use hash tracking
                      ? 'text-white' // No complex active state for hash links in SSR setup just yet without client hook
                      : 'text-gray-400',
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
