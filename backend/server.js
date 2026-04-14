import express from "express";
import session from "express-session";
import passport from "passport";
import flash from "connect-flash";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import "./config/passportSetup.js";

import authRoutes from "./routes/authRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import gmailRoutes from "./routes/gmailRoutes.js";
import creditCardRoutes from "./routes/creditCardRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";




dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();

// Session
app.use(
  session({
    secret: "spendofySecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

// ROUTES
app.use("/api", authRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/transactions", transactionRoutes);

app.use("/api/gmail", gmailRoutes);
app.use("/api/credit-cards", creditCardRoutes);
app.use("/api/pdf", pdfRoutes);




app.listen(5000, () => {
  console.log(" Backend running on port 5000");
});