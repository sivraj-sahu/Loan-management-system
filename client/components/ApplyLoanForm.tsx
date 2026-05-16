"use client";

import { useState } from "react";

import toast from "react-hot-toast";

import API from "@/services/api";

export default function ApplyLoanForm() {
    const [formData, setFormData] =
        useState({
            fullName: "",
            panNumber: "",
            dob: "",
            monthlySalary: "",
            employmentType: "SALARIED",
            loanAmount: "",
            tenureDays: "",
        });

    const [loading, setLoading] =
        useState(false);

    const [salarySlip, setSalarySlip] =
        useState<File | null>(null);

    const interest =
        (Number(formData.loanAmount || 0) *
            12 *
            Number(formData.tenureDays || 0)) /
        (365 * 100);

    const totalRepayment =
        Number(formData.loanAmount || 0) +
        interest;

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            await API.post(
                "/loans/apply",
                {
                    ...formData,
                    monthlySalary: Number(
                        formData.monthlySalary
                    ),
                    loanAmount: Number(
                        formData.loanAmount
                    ),
                    tenureDays: Number(
                        formData.tenureDays
                    ),
                }
            );

            toast.success(
                "Loan applied successfully"
            );

            setFormData({
                fullName: "",
                panNumber: "",
                dob: "",
                monthlySalary: "",
                employmentType:
                    "SALARIED",
                loanAmount: "",
                tenureDays: "",
            });
        } catch (error: any) {
            toast.error(
                error.response?.data?.message ||
                "Loan application failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mt-10">
            <h2 className="text-3xl font-bold mb-8">
                Apply For Loan
            </h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-zinc-800 p-4 rounded-xl outline-none"
                    required
                />

                <input
                    type="text"
                    name="panNumber"
                    placeholder="PAN Number"
                    value={formData.panNumber}
                    onChange={handleChange}
                    className="bg-zinc-800 p-4 rounded-xl outline-none"
                    required
                />

                <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="bg-zinc-800 p-4 rounded-xl outline-none"
                    required
                />

                <input
                    type="number"
                    name="monthlySalary"
                    placeholder="Monthly Salary"
                    value={formData.monthlySalary}
                    onChange={handleChange}
                    className="bg-zinc-800 p-4 rounded-xl outline-none"
                    required
                />

                <select
                    name="employmentType"
                    value={
                        formData.employmentType
                    }
                    onChange={handleChange}
                    className="bg-zinc-800 p-4 rounded-xl outline-none"
                >
                    <option value="SALARIED">
                        SALARIED
                    </option>

                    <option value="SELF_EMPLOYED">
                        SELF EMPLOYED
                    </option>
                </select>

                <div className="md:col-span-2">
                    <label className="block mb-2 text-zinc-400">
                        Upload Salary Slip
                    </label>

                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.pdf"
                        onChange={(e) => {
                            if (e.target.files?.[0]) {
                                setSalarySlip(
                                    e.target.files[0]
                                );
                            }
                        }}
                        className="bg-zinc-800 p-4 rounded-xl outline-none w-full"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-zinc-400">
                        Loan Amount
                    </label>

                    <input
                        type="range"
                        name="loanAmount"
                        min="50000"
                        max="500000"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        className="w-full"
                    />

                    <p className="mt-2">
                        ₹ {formData.loanAmount || 50000}
                    </p>
                </div>

                <div>
                    <label className="block mb-2 text-zinc-400">
                        Tenure Days
                    </label>

                    <input
                        type="range"
                        name="tenureDays"
                        min="30"
                        max="365"
                        value={formData.tenureDays}
                        onChange={handleChange}
                        className="w-full"
                    />

                    <p className="mt-2">
                        {formData.tenureDays || 30} days
                    </p>
                </div>

                <div className="bg-zinc-800 rounded-2xl p-6 md:col-span-2">
                    <h3 className="text-2xl font-bold mb-4">
                        Loan Summary
                    </h3>

                    <p className="mb-2">
                        Interest: ₹ {interest.toFixed(2)}
                    </p>

                    <p>
                        Total Repayment: ₹ {totalRepayment.toFixed(2)}
                    </p>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black py-4 rounded-xl font-semibold col-span-1 md:col-span-2"
                >
                    {loading
                        ? "Submitting..."
                        : "Apply Loan"}
                </button>
            </form>
        </div>
    );
}