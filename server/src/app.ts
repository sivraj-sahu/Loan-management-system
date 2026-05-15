import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import testRoutes from "./routes/test.routes";
import loanRoutes from "./routes/loan.routes";

const app = express();

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.error(error);
  });

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/loans", loanRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
export default app;