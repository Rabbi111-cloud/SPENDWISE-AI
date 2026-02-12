"use client";

import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function ExpenseChart({ transactions }) {
  // Filter only expenses
  const expenses = transactions.filter((t) => t.type === "expense");

  // Group expenses by category
  const data = expenses.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  // Color palette
  const COLORS = [
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#F472B6", // Pink
    "#14B8A6", // Teal
    "#FACC15", // Yellow
  ];

  if (data.length === 0) return null;

  return (
    <div className="mt-10 bg-gray-900 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        {/* Tooltip */}
        <Tooltip
          formatter={(value) => `₦${value}`}
          contentStyle={{
            backgroundColor: "#111827",
            border: "none",
            borderRadius: "8px",
            color: "white",
          }}
        />

        {/* Custom Legend */}
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value, entry, index) => (
            <span className="text-gray-300">{value}</span>
          )}
        />
      </PieChart>

      {/* Optional: Small horizontal color legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            <span className="text-gray-300">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
