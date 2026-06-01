const path = require("path");
const generateQr = require("../../../utils/generateQr");

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

module.exports = {
    uploadVideo
};