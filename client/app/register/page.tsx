"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import API from "@/services/api";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await API.post(
        "/auth/signup",
        {
          fullName,
          email,
          password,
          role: "BORROWER",
        }
      );

      toast.success(
        "Registration successful"
      );

      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-10 shadow-2xl">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">
            Create Account
          </h1>

          <p className="text-zinc-400 mt-3">
            Register as borrower
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-6"
        >
          <div>
            <label className="text-sm text-zinc-400">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-zinc-200 transition"
          >
            {loading
              ? "Creating..."
              : "Register"}
          </button>
        </form>
      </div>
    </main>
  );
}