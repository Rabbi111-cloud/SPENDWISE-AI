"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function ExpenseChart({ transactions }) {
  // Only expenses
  const expenses = transactions.filter(
    (t) => t.type === "expense"
  );

  // Group by category
  const data = expenses.reduce((acc, curr) => {
    const existing = acc.find(
      (item) => item.name === curr.category
    );

    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({
        name: curr.category,
        value: curr.amount,
      });
    }

    return acc;
  }, []);

  if (data.length === 0) return null;

  return (
    <div className="mt-10 bg-gray-900 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">
        Expense Breakdown
      </h2>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#10B981"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
