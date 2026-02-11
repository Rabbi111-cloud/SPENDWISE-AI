"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddTransaction({ user }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category) return;

    try {
      await addDoc(collection(db, "transactions"), {
        amount: Number(amount),
        type,
        category,
        uid: user.uid, // 🔥 THIS IS THE IMPORTANT PART
        createdAt: new Date()
      });

      // Clear form
      setAmount("");
      setCategory("");
      setType("expense");
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 bg-[#111827] p-6 rounded-xl space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Transaction</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 rounded bg-gray-800"
        required
      />

      <input
        type="text"
        placeholder="Category (e.g Food, Salary)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 rounded bg-gray-800"
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-2 rounded bg-gray-800"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button
        type="submit"
        className="w-full bg-emerald-400 text-black py-2 rounded font-semibold"
      >
        Add Transaction
      </button>
    </form>
  );
}
