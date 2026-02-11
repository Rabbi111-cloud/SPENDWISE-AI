"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import AddTransaction from "../../components/AddTransaction";
import ExpenseChart from "../../components/ExpenseChart";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  // Firestore real-time listener
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "transactions"), (snapshot) => {
      setTransactions(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsub();
  }, []);

  // Immediately add new transaction locally
  const handleNewTransaction = (tx) => {
    setTransactions((prev) => [...prev, tx]);
  };

  // Calculate totals
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#111827] p-6 rounded-xl">
          <h3 className="text-gray-400">Income</h3>
          <p className="text-2xl text-emerald-400">₦{income}</p>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl">
          <h3 className="text-gray-400">Expenses</h3>
          <p className="text-2xl text-red-400">₦{expense}</p>
        </div>

        <div className="bg-[#111827] p-6 rounded-xl">
          <h3 className="text-gray-400">Savings</h3>
          <p className="text-2xl">₦{income - expense}</p>
        </div>
      </div>

      {/* Expense Pie Chart */}
      <ExpenseChart transactions={transactions} />

      {/* Add Transaction Form */}
      <AddTransaction onNewTransaction={handleNewTransaction} />
    </div>
  );
}
