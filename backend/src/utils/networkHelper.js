const os = require("os");

const getLocalIp = () => {

    const interfaces = os.networkInterfaces();

    for (const interfaceName in interfaces) {

        for (const network of interfaces[interfaceName]) {

            // Buscar IPv4 válida
            if (
                network.family === "IPv4" &&
                !network.internal
            ) {

                return network.address;

            }

        }

    }

    return "localhost";

};

module.exports = {
    getLocalIp
};