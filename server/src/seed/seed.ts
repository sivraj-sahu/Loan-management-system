import dotenv from "dotenv";

import bcrypt from "bcryptjs";

import connectDB from "../config/db";

import User, { UserRole } from "../models/user.model";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    const password = await bcrypt.hash(
      "Password@123",
      10
    );

    const users = [
      {
        fullName: "Admin User",
        email: "admin@lms.com",
        password,
        role: UserRole.ADMIN,
      },

      {
        fullName: "Sales User",
        email: "sales@lms.com",
        password,
        role: UserRole.SALES,
      },

      {
        fullName: "Sanction User",
        email: "sanction@lms.com",
        password,
        role: UserRole.SANCTION,
      },

      {
        fullName: "Disbursement User",
        email: "disbursement@lms.com",
        password,
        role: UserRole.DISBURSEMENT,
      },

      {
        fullName: "Collection User",
        email: "collection@lms.com",
        password,
        role: UserRole.COLLECTION,
      },

      {
        fullName: "Borrower User",
        email: "borrower@lms.com",
        password,
        role: UserRole.BORROWER,
      },
    ];

    await User.insertMany(users);

    console.log("Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedUsers();