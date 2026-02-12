"use client";

export default function FinancialScore({ income, expense }) {
  // Prevent division by zero
  const financialScore =
    income > 0
      ? Math.max(0, Math.min(100, Math.round(((income - expense) / income) * 100)))
      : 0;

  let scoreText = "";
  if (financialScore > 80) scoreText = "Excellent savings!";
  else if (financialScore > 60) scoreText = "Good, but can improve.";
  else if (financialScore > 40) scoreText = "Be careful with spending.";
  else scoreText = "You need to save more!";

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-xl text-center shadow-lg border border-gray-700 hover:scale-105 transition">
      <h3 className="text-lg font-semibold text-emerald-400 mb-2">
        Financial Score
      </h3>
      <p className="text-4xl font-bold text-white mb-2">{financialScore} / 100</p>
      <p className="text-gray-300">{scoreText}</p>
    </div>
  );
}
