import express from "express";

import {
  applyLoan,
  getAppliedLoans,
  sanctionLoan,
  rejectLoan,
  getSanctionedLoans,
  disburseLoan,
  getDisbursedLoans,
  collectPayment,
  getMyLoans,
} from "../controllers/loan.controller";

import authMiddleware from "../middleware/auth.middleware";

import authorizeRoles from "../middleware/role.middleware";

const router = express.Router();

router.get(
  "/my-loans",
  authMiddleware,
  authorizeRoles("BORROWER"),
  getMyLoans
);

router.post(
  "/apply",
  authMiddleware,
  authorizeRoles("BORROWER"),
  applyLoan
);

router.get(
  "/applied",
  authMiddleware,
  authorizeRoles("SANCTION", "ADMIN"),
  getAppliedLoans
);

router.patch(
  "/:loanId/sanction",
  authMiddleware,
  authorizeRoles("SANCTION", "ADMIN"),
  sanctionLoan
);

router.patch(
  "/:loanId/reject",
  authMiddleware,
  authorizeRoles("SANCTION", "ADMIN"),
  rejectLoan
);

router.get(
  "/sanctioned",
  authMiddleware,
  authorizeRoles("DISBURSEMENT", "ADMIN"),
  getSanctionedLoans
);

router.patch(
  "/:loanId/disburse",
  authMiddleware,
  authorizeRoles("DISBURSEMENT", "ADMIN"),
  disburseLoan
);

router.get(
  "/disbursed",
  authMiddleware,
  authorizeRoles("COLLECTION", "ADMIN"),
  getDisbursedLoans
);

router.post(
  "/:loanId/payment",
  authMiddleware,
  authorizeRoles("COLLECTION", "ADMIN"),
  collectPayment
);

export default router;