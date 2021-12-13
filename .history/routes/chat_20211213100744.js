const express = require("express");
const chatController = require("../controllers/chat");

const router = express.Router();

router.get("/profile", chatController.displayProfile);

router.get("/chat", chatController.displayChat);

module.exports = router;
