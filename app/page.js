export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl font-bold">
        SPEND<span className="text-emerald-400">WISE</span>
      </h1>

      <p className="mt-6 text-gray-400 max-w-xl">
        AI-powered personal finance manager to track expenses and improve savings.
      </p>

      <a
        href="/dashboard"
        className="mt-8 px-6 py-3 bg-emerald-400 text-black rounded-lg font-semibold"
      >
        Go to Dashboard
      </a>
    </div>
  );
}
