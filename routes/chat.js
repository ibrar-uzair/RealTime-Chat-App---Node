const express = require("express");
const chatController = require("../controllers/chat");

const router = express.Router();

router.get("/profile", chatController.displayProfile);

module.exports = router;
