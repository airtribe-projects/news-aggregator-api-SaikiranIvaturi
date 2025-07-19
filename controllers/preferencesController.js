const users = require("../models/userModel");

exports.getPreferences = (req, res) => {
  const user = users.find((u) => u.username === req.user.username);
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json(user.preferences || {});
};

exports.updatePreferences = (req, res) => {
  const { categories, language } = req.body;
  const user = users.find((u) => u.username === req.user.username);

  if (!user) return res.status(404).json({ error: "User not found" });

  if (!Array.isArray(categories) || typeof language !== "string") {
    return res.status(400).json({ error: "Invalid preference data" });
  }

  user.preferences = { categories, language };
  res.json({ message: "Preferences updated", preferences: user.preferences });
};
