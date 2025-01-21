import Link from "next/link";

export default function Success() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-2xl font-bold">🐲 Thanks for your purchase 🐲</h1>
      <Link href="/dashboard" className="btn btn-primary">
        Go to Dashboard 🫵🏽
      </Link>
    </main>
  );
}
