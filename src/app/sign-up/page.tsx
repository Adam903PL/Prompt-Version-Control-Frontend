import Link from 'next/link';
import Image from 'next/image';
import SignUpForm from '@/features/auth/components/signup-form';

function FloatingNavbar({
  actionHref,
  actionLabel,
}: {
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <nav className="fixed inset-x-0 top-4 z-50 pointer-events-none">
      <div className="flex items-center justify-between w-full px-6 pointer-events-auto">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={60}
            height={60}
            className="h-15 w-auto"
          />
        </Link>

        <Link
          href={actionHref}
          className="px-3 py-2 rounded-md text-sm bg-white"
        >
          {actionLabel}
        </Link>
      </div>
    </nav>
  );
}

export default function SignUpPage() {
  return (
    <>
      <FloatingNavbar actionHref="/sign-in" actionLabel="Sign in" />
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold mb-4">Sign up</h1>
          <SignUpForm />
          <p className="mt-4 text-sm">
            Already have an account?
            <Link href="/sign-in" className="text-blue-600 underline">
              Sign in
            </Link>
          </p>
          <p className="mt-2 text-sm">
            Back to
            <Link href="/" className="text-blue-600 underline">
              Home
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
