"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import API from "@/services/api";

import Navbar from "@/components/Navbar";

import StatusBadge from "@/components/StatusBadge";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(
    null
  );

  const [loans, setLoans] = useState<
    any[]
  >([]);

  const [loading, setLoading] =
    useState(true);

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
      parsedUser.role === "BORROWER"
    ) {
      router.push("/borrower");
      return;
    }

    setUser(parsedUser);

    fetchLoans(parsedUser.role);
  }, [router]);

  const fetchLoans = async (
    role: string
  ) => {
    try {
      let endpoint = "";

      if (role === "SANCTION") {
        endpoint =
          "/loans/applied";
      }

      if (
        role === "DISBURSEMENT"
      ) {
        endpoint =
          "/loans/sanctioned";
      }

      if (
        role === "COLLECTION"
      ) {
        endpoint =
          "/loans/disbursed";
      }

      const response =
        await API.get(endpoint);

      setLoans(response.data.loans);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to fetch loans"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (
    loanId: string
  ) => {
    try {
      if (!user) return;

      let endpoint = "";

      let body = {};

      if (user.role === "SANCTION") {
        endpoint = `/loans/${loanId}/sanction`;
      }

      if (
        user.role ===
        "DISBURSEMENT"
      ) {
        endpoint = `/loans/${loanId}/disburse`;
      }

      if (
        user.role === "COLLECTION"
      ) {
        endpoint = `/loans/${loanId}/payment`;

        body = {
          utrNumber:
            "UTR" +
            Date.now(),
          amount: 10000,
          paymentDate:
            new Date(),
        };
      }

      if (user.role === "COLLECTION") {
        await API.post(endpoint, body);
      } else {
        await API.patch(endpoint, body);
      }

      toast.success(
        "Action completed successfully"
      );

      setTimeout(() => {
       fetchLoans(user.role);
    }, 500);

      fetchLoans(user.role);
    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ||
          "Action failed"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    router.push("/login");
  };

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
        
        <Navbar
           title={`${user.role} Dashboard`}
        />

        {loading ? (
          <div>
            Loading loans...
          </div>
        ) : (
          <div className="grid gap-6">
            {loans.length === 0 ? (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                No loans available
              </div>
            ) : (
              loans.map((loan) => (
                <div
                  key={loan._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                >
                  <div>
                    <h2 className="text-2xl font-bold">
                      ₹
                      {loan.loanAmount.toLocaleString()}
                    </h2>

                    <p className="text-zinc-400 mt-2">
                      Status:
                      <span className="ml-2 text-white">
                        <StatusBadge
                          status={loan.status}
                        />
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleAction(
                        loan._id
                      )
                    }
                    className="bg-white text-black px-5 py-3 rounded-xl font-semibold"
                  >
                    {user.role ===
                      "SANCTION" &&
                      "Sanction Loan"}

                    {user.role ===
                      "DISBURSEMENT" &&
                      "Disburse Loan"}

                    {user.role ===
                      "COLLECTION" &&
                      "Collect Payment"}
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
}