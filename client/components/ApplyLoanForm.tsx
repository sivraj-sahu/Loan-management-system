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

        <input
          type="number"
          name="loanAmount"
          placeholder="Loan Amount"
          value={formData.loanAmount}
          onChange={handleChange}
          className="bg-zinc-800 p-4 rounded-xl outline-none"
          required
        />

        <input
          type="number"
          name="tenureDays"
          placeholder="Tenure Days"
          value={formData.tenureDays}
          onChange={handleChange}
          className="bg-zinc-800 p-4 rounded-xl outline-none"
          required
        />

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