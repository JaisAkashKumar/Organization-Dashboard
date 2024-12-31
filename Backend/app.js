// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// Initialize Express
const app = express();

// Configure dotenv to load environment variables from a .env file
dotenv.config();

// Use CORS middleware (optional)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Atlas Connection URL (use the one provided by MongoDB Atlas)
const mongoURI = process.env.MONGO_URI; // This should be stored in your .env file for security

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Import Routes
const organizationRoutes = require("./routes/organizationRoutes");
const teamRoutes = require("./routes/teamRoutes");
const memberRoutes = require("./routes/memberRoutes");
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Server is Up and running");
});

// Use Routes
app.use("/api/organizations", organizationRoutes);
app.use("/api/members", memberRoutes);
app.use("/api", teamRoutes);

// Server Listening
const PORT = process.env.PORT || 5000;

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
