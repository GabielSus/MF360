const fs = require("fs");
const path = require("path");

const createEvent = (req, res) => {

    try {

        const { eventName } = req.body;

        if (!eventName) {
            return res.status(400).json({
                success: false,
                message: "Event name is required"
            });
        }

        // Limpiar nombre
        const cleanName = eventName
            .toLowerCase()
            .replace(/\s+/g, "_");

        // Ruta carpeta evento
        const eventPath = path.join(
            __dirname,
            "../../../../storage/events",
            cleanName
        );

        // Crear carpetas
        fs.mkdirSync(path.join(eventPath, "raw"), { recursive: true });
        fs.mkdirSync(path.join(eventPath, "processing"), { recursive: true });
        fs.mkdirSync(path.join(eventPath, "final"), { recursive: true });
        fs.mkdirSync(path.join(eventPath, "qr"), { recursive: true });

        return res.json({
            success: true,
            message: "Event created successfully",
            event: cleanName
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
    createEvent
};