import mongoose, { Schema, Document } from "mongoose";

export enum EmploymentType {
  SALARIED = "SALARIED",
  SELF_EMPLOYED = "SELF_EMPLOYED",
  UNEMPLOYED = "UNEMPLOYED",
}

export enum LoanStatus {
  APPLIED = "APPLIED",
  REJECTED = "REJECTED",
  SANCTIONED = "SANCTIONED",
  DISBURSED = "DISBURSED",
  CLOSED = "CLOSED",
}

export interface ILoan extends Document {
  borrower: mongoose.Types.ObjectId;

  fullName: string;
  panNumber: string;
  dob: Date;
  monthlySalary: number;
  employmentType: EmploymentType;

  loanAmount: number;
  tenureDays: number;

  interestRate: number;
  interestAmount: number;
  totalRepayment: number;
  outstandingAmount: number;

  status: LoanStatus;

  rejectionReason?: string;
}

const loanSchema = new Schema<ILoan>(
  {
    borrower: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    panNumber: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    monthlySalary: {
      type: Number,
      required: true,
    },

    employmentType: {
      type: String,
      enum: Object.values(EmploymentType),
      required: true,
    },

    loanAmount: {
      type: Number,
      required: true,
    },

    tenureDays: {
      type: Number,
      required: true,
    },

    interestRate: {
      type: Number,
      default: 12,
    },

    interestAmount: {
      type: Number,
      required: true,
    },

    totalRepayment: {
      type: Number,
      required: true,
    },

    outstandingAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(LoanStatus),
      default: LoanStatus.APPLIED,
    },

    rejectionReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model<ILoan>("Loan", loanSchema);

export default Loan;