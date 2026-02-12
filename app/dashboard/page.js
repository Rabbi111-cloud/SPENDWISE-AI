"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import AddTransaction from "../../components/AddTransaction";
import ExpenseChart from "../../components/ExpenseChart";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // 🔐 Protect Route
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);

        const q = query(
          collection(db, "transactions"),
          where("uid", "==", currentUser.uid)
        );

        const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
          setTransactions(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        return () => unsubscribeSnapshot();
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // 💰 Calculations
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const total = income + expense;
  const expensePercent = total > 0 ? (expense / total) * 100 : 0;

  let suggestion = "";

  if (expensePercent > 70) {
    suggestion =
      "⚠️ You are spending more than 70% of your income. Consider reducing non-essential expenses.";
  } else if (expensePercent > 50) {
    suggestion =
      "You are spending over half your income. Try saving at least 20%.";
  } else if (expensePercent > 30) {
    suggestion =
      "Good balance! You can increase your savings slightly.";
  } else {
    suggestion = "Excellent saving habit! Keep it up 🎉";
  }

  // 🔓 Logout
  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  // 🗑 Delete
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "transactions", id));
  };

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto bg-gradient-to-br from-[#0B0F19] via-[#0F172A] to-[#111827] text-white">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          <span className="text-white">SPENDWISE</span>{" "}
          <span className="text-emerald-400">AI</span>
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 rounded-lg hover:opacity-80 transition"
        >
          Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-[1.02] transition">
          <h3 className="text-gray-400">Income</h3>
          <p className="text-2xl text-emerald-400">₦{income}</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-[1.02] transition">
          <h3 className="text-gray-400">Expenses</h3>
          <p className="text-2xl text-red-400">₦{expense}</p>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 hover:scale-[1.02] transition">
          <h3 className="text-gray-400">Savings</h3>
          <p className="text-2xl">₦{income - expense}</p>
        </div>
      </div>

      {/* AI Insight */}
      <div className="mb-10 bg-emerald-900/20 border border-emerald-400 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-emerald-400 mb-2">
          AI Smart Insight
        </h3>
        <p className="text-gray-300">{suggestion}</p>
      </div>

      {/* Chart */}
      <ExpenseChart transactions={transactions} />

      {/* Add Transaction */}
      <AddTransaction user={user} />

      {/* Transaction History */}
      <div className="mt-10 bg-gray-900 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          Transaction History
        </h2>

        {transactions.length === 0 ? (
          <p className="text-gray-400">No transactions yet.</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{t.category}</p>
                  <p className="text-sm text-gray-400">{t.type}</p>
                </div>

                <div className="flex items-center gap-4">
                  <p
                    className={
                      t.type === "income"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }
                  >
                    ₦{t.amount}
                  </p>

                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
