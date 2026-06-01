const QRCode = require("qrcode");

const path = require("path");

const fs = require("fs");

const generateQr = async (eventName, videoId) => {

    try {

        // URL del video
        const videoUrl = `http://${global.LOCAL_IP}:3000/videos/${eventName}/${videoId}`;
        
        // Ruta donde guardar QR
        const qrFolder = path.join(
            process.cwd(),
            "storage",
            "events",
            eventName,
            "qr"
        );

        // Crear carpeta si no existe
        fs.mkdirSync(qrFolder, { recursive: true });

        // Nombre archivo QR
        const qrFileName = `${videoId}.png`;

        // Ruta completa QR
        const qrPath = path.join(
            qrFolder,
            qrFileName
        );

        // Generar QR
        await QRCode.toFile(qrPath, videoUrl);

        return {
            success: true,
            qrPath,
            qrFileName,
            videoUrl
        };

    } catch (error) {

        console.error(error);

        return {
            success: false
        };

    }

};

module.exports = generateQr;