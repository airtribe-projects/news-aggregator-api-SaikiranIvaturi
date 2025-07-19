const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/userModel");
const { validateRegistration, validateLogin } = require("../utils/validators");

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  const error = validateRegistration(username, password);
  if (error) return res.status(400).json({ error });

  const existing = users.find((u) => u.username === username);
  if (existing) return res.status(409).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed, preferences: {} });

  res.status(201).json({ message: "User registered" });
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const error = validateLogin(username, password);
  if (error) return res.status(400).json({ error });

  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
};
