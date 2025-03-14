// routes/expenseRoutes.js
const express = require("express");
const db = require("../db"); // Import our MySQL connection
const router = express.Router();

// Add Expense API endpoint
router.post("/add-expense", (req, res) => {
  const { label, amount, category } = req.body;

  // Basic validation
  if (!label || amount <= 0) {
    return res.status(400).json({ message: "Invalid input: label and a positive amount required" });
  }

  const query = "INSERT INTO expenses (label, amount, category) VALUES (?, ?, ?)";
  db.query(query, [label, amount, category], (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Expense added successfully!" });
  });
});

// (Optionally, you can add more routes for reading, updating, and deleting expenses.)

module.exports = router;
