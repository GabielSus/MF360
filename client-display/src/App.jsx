import { useEffect, useState } from "react";

import { io } from "socket.io-client";

const socket = io("http://192.168.1.14:3000");

function App() {

    const [videoData, setVideoData] = useState(null);

    useEffect(() => {

        socket.on("new-video", (data) => {

            console.log("NEW VIDEO:", data);

            setVideoData(data);

        });

    }, []);

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                background: "#111",
                color: "white"
            }}
        >

            <h1>MFproducciones 360</h1>

            {
                videoData ? (

                    <>
                        <h2>🎉 Tu video está listo</h2>

                        <img
                            src={`http://192.168.1.14:3000/storage/events/${videoData.eventName}/qr/${videoData.qr}`}
                            alt="QR"
                            width={300}
                        />

                        <p>{videoData.videoUrl}</p>
                    </>

                ) : (

                    <h2>Esperando videos...</h2>

                )
            }

        </div>

    );

}

export default App;