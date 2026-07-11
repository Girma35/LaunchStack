import Link from "next/link";
import { Button } from "@launchstack/ui";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 px-6 py-24 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-5xl font-black tracking-tight">LaunchStack</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-700 dark:text-slate-300">
          Production-grade AI SaaS starter kit with multi-tenant auth, RBAC, billing, and AI-ready data model.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/auth/signup">
            <Button>Create Account</Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
