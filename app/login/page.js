"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-800"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800"
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="w-full bg-emerald-400 text-black py-2 rounded font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}
