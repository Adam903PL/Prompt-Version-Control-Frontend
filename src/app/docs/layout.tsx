import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { DocsSidebar } from './components/sidebar';

export const metadata: Metadata = {
  title: 'Documentation - PVC',
  description: 'Documentation for Prompt Version Control CLI',
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Background (reused from Landing for consistency) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-white opacity-[0.02] blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      </div>

      {/* Navbar (Simplified for docs) */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/icon/logo.svg"
                alt="PVC"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-semibold tracking-tight text-lg">PVC</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
              <Link href="/docs" className="text-white">
                Documentation
              </Link>
              <a
                href="https://github.com/promptversioncontrol-org"
                target="_blank"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            {/* Add search or other docs-header items here if needed */}
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <main className="pt-16 max-w-[1400px] mx-auto flex relative z-10">
        <DocsSidebar />
        <div className="flex-1 min-w-0">
          <div className="max-w-3xl mx-auto px-6 py-12 md:px-12 md:py-16">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
