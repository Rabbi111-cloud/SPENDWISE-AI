"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "transactions"), {
      amount: Number(amount),
      type,
      category,
      date: new Date()
    });

    setAmount("");
    setCategory("");
  };

  return (
    <div className="bg-[#111827] p-6 rounded-xl mt-10">
      <h2 className="text-lg font-semibold mb-4">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
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

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded bg-gray-800"
          required
        />

        <button className="w-full bg-emerald-400 text-black py-2 rounded font-semibold">
          Add Transaction
        </button>
      </form>
    </div>
  );
}
