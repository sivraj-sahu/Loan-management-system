# Loan Management System (LMS)

A full-stack Loan Management System built using Next.js, Node.js, Express, MongoDB, and TypeScript.

## Features

- User Authentication (JWT)
- Role-Based Access Control (RBAC)
- Borrower Loan Application
- BRE Validation
- Salary Slip Upload
- Loan Sanction Module
- Loan Disbursement Module
- Loan Collection Module
- Auto Loan Closure
- Sales Dashboard
- Admin Dashboard

---

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

---

## Roles

- ADMIN
- SALES
- SANCTION
- DISBURSEMENT
- COLLECTION
- BORROWER

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <repo_url>
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:

```bash
npm run dev
```

---

### 3. Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Seed Users

Run:

```bash
npm run seed
```

---

## Default Credentials

### Admin
- Email: admin@lms.com
- Password: Password@123

### Sales
- Email: sales@lms.com
- Password: Password@123

### Sanction
- Email: sanction@lms.com
- Password: Password@123

### Disbursement
- Email: disbursement@lms.com
- Password: Password@123

### Collection
- Email: collection@lms.com
- Password: Password@123

---

## Loan Lifecycle

1. Borrower applies for loan
2. Sanction team approves/rejects
3. Disbursement team disburses loan
4. Collection team collects repayment
5. Loan auto closes after repayment

---

## Author

Sivraj Sahu
