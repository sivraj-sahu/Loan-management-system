import express from "express";

import authMiddleware from "../middleware/auth.middleware";
import authorizeRoles from "../middleware/role.middleware";

const router = express.Router();

router.get(
  "/protected",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Protected route accessed",
    });
  }
);

router.get(
  "/admin",
  authMiddleware,
  authorizeRoles("ADMIN"),
  (req, res) => {
    res.json({
      message: "Welcome Admin",
    });
  }
);

export default router;