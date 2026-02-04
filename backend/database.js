const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("./database");

const router = express.Router();

/* SIGNUP */
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (username, email, password, role)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [username, email, hashedPassword, role], function (err) {
    if (err) {
      return res.status(400).json({ message: "User already exists" });
    }
    res.status(201).json({ message: "Signup successful" });
  });
});

/* LOGIN */
router.post("/login", (req, res) => {
  const { username, password, role } = req.body;

  const query = `
    SELECT * FROM users WHERE username = ? AND role = ?
  `;

  db.get(query, [username, role], async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  });
});

module.exports = router;
