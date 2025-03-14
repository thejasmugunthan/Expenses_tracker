const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  port:"3304",
  user: "root", // Replace with your MySQL username
  password: "Thejas@2004", // Replace with your MySQL password
  database: "expense_tracker", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Add Expense API Endpoint
app.post("/add-expense", (req, res) => {
  const { label, value, category } = req.body;

  if (!label || !value || !category) {
    return res.status(400).json({ error: "Invalid input. Please provide all fields." });
  }

  const query = "INSERT INTO expenses (label, amount, category) VALUES (?, ?, ?)";
  db.query(query, [label, value, category], (err, result) => {
    if (err) {
      console.error("Error inserting expense:", err);
      return res.status(500).json({ error: "Failed to save expense." });
    }

    res.status(200).json({ message: "Expense added successfully!" });
  });
});

// Add Budget API Endpoint
app.post("/add-budget", (req, res) => {
  const { label, value } = req.body;

  if (!label || !value || value <= 0) {
    return res.status(400).json({ error: "Invalid input. Ensure all fields are filled correctly." });
  }

  const query = "INSERT INTO budgets (label, amount) VALUES (?, ?)";
  db.query(query, [label, value], (err, result) => {
    if (err) {
      console.error("Error inserting budget:", err);
      return res.status(500).json({ error: "Failed to save budget." });
    }

    res.status(200).json({ message: "Budget added successfully!" });
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
