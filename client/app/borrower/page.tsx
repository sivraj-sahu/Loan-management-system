"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";

import ApplyLoanForm from "@/components/ApplyLoanForm";

import LoanList from "@/components/LoanList";

export default function BorrowerPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(
    null
  );

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser =
      JSON.parse(storedUser);

    if (
      parsedUser.role !== "BORROWER"
    ) {
      router.push("/login");
      return;
    }

    setUser(parsedUser);
  }, [router]);

  if (!user)
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <p className="text-zinc-400 text-lg">
        Loading dashboard...
      </p>
    </main>
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <Navbar title="Borrower Dashboard" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition">
            <div className="text-4xl mb-5">
              💳
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              Apply Loan
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Submit a new loan application
              and track approval status.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition">
            <div className="text-4xl mb-5">
              📈
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              Loan Status
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              Monitor your sanctioned,
              disbursed, and closed loans.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition">
            <div className="text-4xl mb-5">
              💰
            </div>

            <h2 className="text-2xl font-semibold mb-3">
              Payments
            </h2>

            <p className="text-zinc-400 leading-relaxed">
              View repayment history and
              outstanding balances.
            </p>
          </div>
        </div>

        <ApplyLoanForm />

        <LoanList />

      </div>
    </main>
  );
}