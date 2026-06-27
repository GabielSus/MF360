const express = require("express");

const multer = require("multer");

const path = require("path");

const fs = require("fs");

const router = express.Router();


// Este es el Import
const {
    uploadVideo,
    getVideos,
    getVideosCount
} = require("../controllers/videoController");


// STORAGE CONFIG

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        const { eventName } = req.params;

        const uploadPath = path.join(
            process.cwd(),
            "storage",
            "events",
            eventName,
            "raw"
        );

        // Crear carpeta si no existe
        fs.mkdirSync(uploadPath, { recursive: true });

        cb(null, uploadPath);

    },

    filename: (req, file, cb) => {

        const uniqueName = `${Date.now()}-${file.originalname}`;

        cb(null, uniqueName);

    }

});

router.get(
    "/list/:eventName",
    getVideos
);

router.get(
    "/count/:eventName",
    getVideosCount
);

const upload = multer({ storage });

router.get(
    "/:eventName/:videoName",
    (req, res) => {

        const { eventName, videoName } = req.params;

        const videoPath = path.join(
            process.cwd(),
            "storage",
            "events",
            eventName,
            "raw",
            videoName
        );

        res.sendFile(videoPath);

    }
);

// ROUTE

router.post(
    "/upload/:eventName",
    upload.single("video"),
    uploadVideo
);

module.exports = router;