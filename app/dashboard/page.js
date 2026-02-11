"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
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

        // 🔥 Real-time user-specific transactions
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

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.email}</h1>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
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

      {/* Chart */}
      <ExpenseChart transactions={transactions} />

      {/* Add Transaction */}
      <AddTransaction user={user} />
    </div>
  );
}
