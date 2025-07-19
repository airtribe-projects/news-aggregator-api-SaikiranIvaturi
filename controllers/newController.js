const axios = require("axios");
const users = require("../models/userModel");

exports.getNews = async (req, res) => {
  try {
    const user = users.find((u) => u.username === req.user.username);
    if (!user || !user.preferences) {
      return res.status(400).json({ error: "User preferences not set" });
    }

    const { categories = [], language = "en" } = user.preferences;
    const query = categories.join(" OR ") || "news";

    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        language,
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};
