import { Response } from "express";

import Loan, { LoanStatus } from "../models/loan.model";

import Payment from "../models/payment.model";

import { AuthRequest } from "../middleware/auth.middleware";

import { runBREChecks } from "../services/bre.service";

export const applyLoan = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const {
            fullName,
            panNumber,
            dob,
            monthlySalary,
            employmentType,
            loanAmount,
            tenureDays,
        } = req.body;

        const breResult = runBREChecks({
            dob,
            monthlySalary,
            panNumber,
            employmentType,
        });

        if (!breResult.success) {
            return res.status(400).json({
                message: breResult.message,
            });
        }

        const interestRate = 12;

        const interestAmount =
            (loanAmount * interestRate * tenureDays) /
            (365 * 100);

        const totalRepayment =
            loanAmount + interestAmount;

        const loan = await Loan.create({
            borrower: req.user.userId,

            fullName,
            panNumber,
            dob,
            monthlySalary,
            employmentType,

            loanAmount,
            tenureDays,

            interestRate,
            interestAmount,
            totalRepayment,
            outstandingAmount: totalRepayment,
        });

        res.status(201).json({
            message: "Loan application submitted",
            loan,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const getAppliedLoans = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const loans = await Loan.find({
            status: LoanStatus.APPLIED,
        }).populate(
            "borrower",
            "fullName email"
        );

        res.status(200).json({
            loans,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const sanctionLoan = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { loanId } = req.params;

        const loan = await Loan.findById(loanId);

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found",
            });
        }

        if (loan.status !== "APPLIED") {
            return res.status(400).json({
                message: "Only applied loans can be sanctioned",
            });
        }

        loan.status = LoanStatus.SANCTIONED;

        await loan.save();

        res.status(200).json({
            message: "Loan sanctioned successfully",
            loan,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const rejectLoan = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { loanId } = req.params;

        const { rejectionReason } = req.body;

        const loan = await Loan.findById(loanId);

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found",
            });
        }

        if (loan.status !== "APPLIED") {
            return res.status(400).json({
                message: "Only applied loans can be rejected",
            });
        }

        loan.status = LoanStatus.REJECTED;

        loan.rejectionReason = rejectionReason;

        await loan.save();

        res.status(200).json({
            message: "Loan rejected successfully",
            loan,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const getSanctionedLoans = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const loans = await Loan.find({
            status: LoanStatus.SANCTIONED,
        }).populate(
            "borrower",
            "fullName email"
        );

        res.status(200).json({
            loans,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const disburseLoan = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { loanId } = req.params;

        const loan = await Loan.findById(loanId);

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found",
            });
        }

        if (
            loan.status !== LoanStatus.SANCTIONED
        ) {
            return res.status(400).json({
                message:
                    "Only sanctioned loans can be disbursed",
            });
        }

        loan.status = LoanStatus.DISBURSED;

        await loan.save();

        res.status(200).json({
            message: "Loan disbursed successfully",
            loan,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const getDisbursedLoans = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const loans = await Loan.find({
            status: LoanStatus.DISBURSED,
        }).populate(
            "borrower",
            "fullName email"
        );
        res.status(200).json({
            loans,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const collectPayment = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const { loanId } = req.params;

        const {
            utrNumber,
            amount,
            paymentDate,
        } = req.body;

        const loan = await Loan.findById(loanId);

        if (!loan) {
            return res.status(404).json({
                message: "Loan not found",
            });
        }

        if (
            loan.status !== LoanStatus.DISBURSED
        ) {
            return res.status(400).json({
                message:
                    "Payments allowed only for disbursed loans",
            });
        }

        const existingUTR =
            await Payment.findOne({
                utrNumber,
            });

        if (existingUTR) {
            return res.status(400).json({
                message: "UTR already exists",
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                message:
                    "Payment amount must be greater than zero",
            });
        }

        if (amount > loan.outstandingAmount) {
            return res.status(400).json({
                message:
                    "Payment exceeds outstanding amount",
            });
        }

        const payment = await Payment.create({
            loan: loan._id,

            utrNumber,

            amount,

            paymentDate,
        });

        loan.outstandingAmount =
            loan.outstandingAmount - amount;

        if (loan.outstandingAmount <= 0) {
            loan.status = LoanStatus.CLOSED;
        }

        await loan.save();

        res.status(201).json({
            message: "Payment collected successfully",
            payment,
            outstandingAmount:
                loan.outstandingAmount,
            loanStatus: loan.status,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const getMyLoans = async (
    req: AuthRequest,
    res: Response
) => {
    try {
        const loans = await Loan.find({
            borrower: req.user.userId,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            loans,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error,
        });
    }
};

export const getAllLoans = async (
    req: any,
    res: any
) => {

    try {

        const loans = await Loan.find()
            .populate(
                "borrower",
                "fullName email"
            );

        res.status(200).json(loans);

    } catch (error) {

        res.status(500).json({
            message: "Server Error",
        });
    }
};