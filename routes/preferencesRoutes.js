const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getPreferences,
  updatePreferences,
} = require("../controllers/preferencesController");

router.get("/", authMiddleware, getPreferences);
router.put("/", authMiddleware, updatePreferences);

module.exports = router;
