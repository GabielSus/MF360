const express = require("express");

const router = express.Router();

const {
    createEvent,
    getEvents
} = require("../controllers/eventController");

router.get("/list", getEvents);

router.post("/create", createEvent);

module.exports = router;