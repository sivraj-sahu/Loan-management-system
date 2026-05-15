"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">

        {/* HERO */}
       <div className="text-center max-w-4xl mx-auto">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm text-zinc-400 mb-6">
          <span className="text-base">🚀</span>
          <span>Full Stack LMS Platform</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
         Loan Management System
        </h1>

       <p className="text-zinc-400 text-base md:text-lg leading-relaxed mt-6 max-w-2xl mx-auto">
         A role-based full-stack loan management platform built using Next.js, Express.js, MongoDB, JWT authentication, and business rule engine workflows.
       </p>

       <div className="mt-10">
        <Link
          href="/login"
          className="inline-flex items-center justify-center bg-white text-black px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Login To Continue
        </Link>
       </div>
      </div>

        {/* ROLE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-20">

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 hover:bg-zinc-900 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
              <span className="text-2xl">👤</span>
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Borrower
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Apply for loans and track repayment lifecycle.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 hover:bg-zinc-900 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
              <span className="text-2xl">✅</span>
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Sanction
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Review and sanction loan applications.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 hover:bg-zinc-900 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-colors">
              <span className="text-2xl">💸</span>
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Disbursement
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Process sanctioned loans and disburse funds.
            </p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 hover:bg-zinc-900 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
              <span className="text-2xl">📦</span>
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Collection
            </h2>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Track repayments and collect loan payments efficiently.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}