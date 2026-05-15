import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import loanRoutes from "./routes/loan.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/loans", loanRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

export default app;