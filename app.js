const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const preferencesRoutes = require("./routes/preferencesRoutes");
const newsRoutes = require("./routes/newsRoutes");

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferencesRoutes);
app.use("/api/news", newsRoutes);

app.get("/", (req, res) => res.send("Welcome to the News Aggregator API"));

module.exports = app;
