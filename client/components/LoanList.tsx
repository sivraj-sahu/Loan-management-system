"use client";

import { useEffect, useState } from "react";

import API from "@/services/api";

import StatusBadge from "./StatusBadge";

export default function LoanList() {
  const [loans, setLoans] = useState<
    any[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response =
        await API.get(
          "/loans/my-loans"
        );

      setLoans(response.data.loans);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-10 text-zinc-400">
        Loading loans...
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-8">
        My Loans
      </h2>

      <div className="grid gap-6">
        {loans.length === 0 ? (
         <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
  
           <div className="text-5xl mb-5">
             📭
           </div>

           <h2 className="text-2xl font-bold mb-3">
             No Loans Yet
           </h2>

           <p className="text-zinc-400">
             Apply for your first loan to
             get started.
           </p>
         </div>
        ) : (
          loans.map((loan) => (
            <div
              key={loan._id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                
                <div>
                  <h3 className="text-2xl font-semibold">
                    ₹
                    {loan.loanAmount.toLocaleString()}
                  </h3>

                  <p className="text-zinc-400 mt-2">
                    Status:
                    <span className="ml-2 text-white font-medium">
                      <StatusBadge
                         status={loan.status}
                        />
                    </span>
                  </p>
                </div>

                <div className="text-zinc-300">
                  <p>
                    Outstanding:
                    <span className="ml-2 font-semibold text-white">
                      ₹
                      {Math.round(
                        loan.outstandingAmount
                      ).toLocaleString()}
                    </span>
                  </p>

                  <p className="mt-2">
                    Interest:
                    <span className="ml-2">
                      ₹
                      {Math.round(
                        loan.interestAmount
                      ).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}