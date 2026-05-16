import express from "express";

import { signup, login } from "../controllers/auth.controller";

import { getUsers } from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/users", getUsers);

export default router;