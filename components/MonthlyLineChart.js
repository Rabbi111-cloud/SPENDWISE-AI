"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function MonthlyLineChart({ transactions }) {
  // Prepare data grouped by month
  const monthlyData = {};

  transactions.forEach((t) => {
    const dateObj = new Date(t.date);
    const month = dateObj.toLocaleString("default", { month: "short", year: "numeric" });

    if (!monthlyData[month]) {
      monthlyData[month] = { month, income: 0, expense: 0 };
    }

    if (t.type === "income") monthlyData[month].income += t.amount;
    if (t.type === "expense") monthlyData[month].expense += t.amount;
  });

  // Sort months chronologically
  const chartData = Object.values(monthlyData).sort((a, b) => {
    const [monthA, yearA] = a.month.split(" ");
    const [monthB, yearB] = b.month.split(" ");
    const dateA = new Date(`${monthA} 1, ${yearA}`);
    const dateB = new Date(`${monthB} 1, ${yearB}`);
    return dateA - dateB;
  });

  if (chartData.length === 0) return null;

  return (
    <div className="bg-gray-900 p-6 rounded-xl mb-10">
      <h3 className="text-xl font-semibold mb-4">Monthly Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderRadius: "8px", border: "none", color: "#fff" }}
          />
          <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
