"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddTransaction({ user }) {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category || !amount || !date) return;

    await addDoc(collection(db, "transactions"), {
      uid: user.uid,
      type,
      category,
      amount: Number(amount),
      date,
    });

    setCategory("");
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="mt-10 bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-gray-300">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-black"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-gray-300">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Food, Salary"
            className="w-full px-3 py-2 rounded-lg text-black"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-300">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="₦0"
            className="w-full px-3 py-2 rounded-lg text-black"
          />
        </div>

        <div>
          <label className="block mb-2 text-gray-300">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-2 bg-emerald-400 text-black rounded-lg font-semibold hover:scale-105 transition"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}
