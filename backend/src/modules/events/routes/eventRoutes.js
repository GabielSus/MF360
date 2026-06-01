const express = require("express");

const router = express.Router();

const {
    createEvent
} = require("../controllers/eventController");

router.post("/create", createEvent);

module.exports = router;