"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  getUser,
  logout,
} from "@/utils/auth";

export default function Navbar({
  title,
}: {
  title: string;
}) {
  const router = useRouter();

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
      
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          {title}
        </h1>

        <p className="text-zinc-400 mt-2">
          Welcome back,{" "}
          {user?.fullName || "User"}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white transition px-5 py-3 rounded-xl font-medium"
      >
        Logout
      </button>
    </div>
  );
}