import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      
      <h1 className="text-5xl font-bold mb-6">
        <span className="text-white">SPENDWISE</span>{" "}
        <span className="text-emerald-400">AI</span>
      </h1>

      <p className="text-gray-400 max-w-2xl mb-8">
        Track your income and expenses across accounts,
        visualize spending patterns, and receive AI-powered
        savings suggestions.
      </p>

      <div className="flex gap-4">
        <Link
          href="/signup"
          className="px-6 py-3 bg-emerald-400 text-black rounded-lg font-semibold hover:scale-105 transition"
        >
          Get Started
        </Link>

        <Link
          href="/login"
          className="px-6 py-3 border border-emerald-400 text-emerald-400 rounded-lg font-semibold hover:scale-105 transition"
        >
          Login
        </Link>
      </div>

    </main>
  );
}
