const path = require("path");
const generateQr = require("../../../utils/generateQr");
const fs = require("fs");
const uploadVideo = async (req, res) => {

    try {

        const { eventName } = req.params;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No video uploaded"
            });
        }

        // Nombre archivo video
        const videoFileName = req.file.filename;

        // Generar QR
        const qrResult = await generateQr(
            eventName,
            videoFileName
        );
        
    global.IO.emit("new-video", {

        qr: qrResult.qrFileName,

        videoUrl: qrResult.videoUrl,

        eventName

});
        
        return res.json({
            success: true,
            message: "Video uploaded successfully",
            file: videoFileName,
            qr: qrResult.qrFileName,
            videoUrl: qrResult.videoUrl
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};
const getVideos = async (req, res) => {

    try {

        const { eventName } = req.params;

        const videosPath = path.join(
            process.cwd(),
            "storage",
            "events",
            eventName,
            "raw"
        );

        if (!fs.existsSync(videosPath)) {

            return res.json({
                success: true,
                videos: []
            });

        }

        const videos = fs.readdirSync(videosPath);

        return res.json({
            success: true,
            videos
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const getVideosCount = async (req, res) => {

    try {

        const { eventName } = req.params;

        const videosPath = path.join(
            process.cwd(),
            "storage",
            "events",
            eventName,
            "raw"
        );

        if (!fs.existsSync(videosPath)) {

            return res.json({
                success: true,
                count: 0
            });

        }

        const videos = fs
            .readdirSync(videosPath)
            .filter(file => file.endsWith(".mp4"));

        return res.json({
            success: true,
            count: videos.length
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    uploadVideo,
    getVideos,
    getVideosCount
};

