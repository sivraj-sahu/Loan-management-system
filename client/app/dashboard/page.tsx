"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import Navbar from "@/components/Navbar";

import API from "@/services/api";

import SalesLeads from "@/components/SalesLeads";

export default function DashboardPage() {

    const router = useRouter();

    const [user, setUser] = useState<any>(
        null
    );

    const [loans, setLoans] = useState<any[]>(
        []
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
            parsedUser.role === "BORROWER"
        ) {
            router.push("/borrower");
            return;
        }

        setUser(parsedUser);

    }, [router]);

    useEffect(() => {

        if (!user) return;

        const fetchLoans = async () => {

            try {

                let endpoint = "";

                if (
                    user.role === "SANCTION"
                ) {
                    endpoint = "/loans/applied";
                }

                else if (
                    user.role ===
                    "DISBURSEMENT"
                ) {
                    endpoint =
                        "/loans/sanctioned";
                }

                else if (
                    user.role ===
                    "COLLECTION"
                ) {
                    endpoint =
                        "/loans/disbursed";
                }

                else if (
                    user.role === "ADMIN"
                ) {
                    endpoint = "/loans";
                }

                if (!endpoint) return;

                const response =
                    await API.get(endpoint);

                setLoans(
                    Array.isArray(
                        response.data
                    )
                        ? response.data
                        : response.data.loans || []
                );

            } catch (error) {

                console.error(error);
            }
        };

        fetchLoans();

    }, [user]);

    const handleAction = async (
        loan: any
    ) => {

        const loanId = loan._id;

        try {

            if (
                user.role === "SANCTION"
            ) {

                await API.patch(
                    `/loans/${loanId}/sanction`
                );
            }

            if (
                user.role ===
                "DISBURSEMENT"
            ) {

                await API.patch(
                    `/loans/${loanId}/disburse`
                );
            }

            if (
                user.role ===
                "COLLECTION"
            ) {

                await API.post(
                    `/loans/${loanId}/payment`,
                    {
                        amount:
                            loan.outstandingAmount ||
                            loan.totalRepayment,
                        utrNumber:
                            "UTR" + Date.now(),
                        paymentDate:
                            new Date(),
                    }
                );
            }

            toast.success(
                "Action completed successfully"
            );

            window.location.reload();

        } catch (error: any) {

            toast.error(
                error.response?.data
                    ?.message ||
                "Action failed"
            );
        }
    };

    if (!user)
        return (
            <main className="min-h-screen bg-black text-white flex items-center justify-center">
                Loading...
            </main>
        );

    return (
        <main className="min-h-screen bg-black text-white p-8">

            <div className="max-w-7xl mx-auto">

                <Navbar
                    title={`${user.role} Dashboard`}
                />

                {user.role === "SALES" && (
                    <div className="mt-10">
                        <SalesLeads />
                    </div>
                )}

                {(user.role ===
                    "SANCTION" ||
                    user.role ===
                    "DISBURSEMENT" ||
                    user.role ===
                    "COLLECTION" ||
                    user.role ===
                    "ADMIN") && (

                        <div className="space-y-6 mt-10">

                            {loans.map((loan) => (

                                <div
                                    key={loan._id}
                                    className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex items-center justify-between"
                                >

                                    <div>

                                        <p className="text-zinc-300 font-semibold mb-1">
                                            {loan.borrower?.fullName}
                                        </p>

                                        <p className="text-zinc-500 text-sm mb-4">
                                            {loan.borrower?.email}
                                        </p>

                                        <h2 className="text-4xl font-bold mb-4">
                                            ₹
                                            {Number(
                                                loan.totalRepayment
                                            ).toFixed(2)}
                                        </h2>

                                        <div className="flex items-center gap-3">

                                            <span className="text-zinc-400">
                                                Status:
                                            </span>

                                            <span className="bg-green-900 text-green-400 px-4 py-2 rounded-full">
                                                {loan.status}
                                            </span>

                                        </div>
                                    </div>

                                    {user.role !==
                                        "ADMIN" && (

                                            <button
                                                onClick={() =>
                                                    handleAction(
                                                        loan
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

                                        )}

                                </div>

                            ))}

                        </div>

                    )}

            </div>

        </main>
    );
}
