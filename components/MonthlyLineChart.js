"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function MonthlyLineChart({ transactions }) {
  // Prepare monthly data
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const monthlyData = months.map((month, index) => {
    const income = transactions
      .filter(
        t =>
          t.type === "income" &&
          new Date(t.date).getMonth() === index
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(
        t =>
          t.type === "expense" &&
          new Date(t.date).getMonth() === index
      )
      .reduce((sum, t) => sum + t.amount, 0);

    return { month, income, expense };
  });

  return (
    <div className="mt-10 bg-gray-900 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Monthly Analytics</h2>
      <LineChart width={600} height={300} data={monthlyData}>
        <CartesianGrid stroke="#2c2c2c" strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#ccc"/>
        <YAxis stroke="#ccc"/>
        <Tooltip
          contentStyle={{ backgroundColor: "#111827", border: "none", borderRadius: "8px", color: "white" }}
          formatter={(value) => `₦${value}`}
        />
        <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} />
        <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} />
      </LineChart>
    </div>
  );
}
