require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");



const app = express();

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tickets", require("./routes/ticketRoutes"));

app.get("/", (req, res) => {
    res.json({
        message: "Support CRM API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});