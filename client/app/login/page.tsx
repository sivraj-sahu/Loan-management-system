"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast, { Toaster } from "react-hot-toast";

import API from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post(
        "/api/auth/login",
        {
          email,
          password,
        }
      );

      const { token, user } =
        response.data;

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      toast.success("Login successful");

      if (user.role === "BORROWER") {
        router.push("/borrower");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
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
          Loan Management System
        </h1>

        <p className="text-zinc-400 mt-3">
          Login to continue
        </p>
      </div>

      <form
        onSubmit={handleLogin}
        className="space-y-6"
      >
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
              setPassword(
                e.target.value
              )
            }
            className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-white placeholder:text-zinc-400 outline-none focus:border-zinc-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:bg-zinc-200 transition"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>
        <p className="text-sm text-zinc-400 text-center mt-6">
          Don&apos;t have an account?{" "}
          <span
           onClick={() => router.push("/register")}
           className="text-white cursor-pointer hover:underline"
          >
           Register
          </span>
        </p>
      </form>
    </div>
  </main>
  );
}