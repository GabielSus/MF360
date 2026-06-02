import axios from "axios";
import BASE_URL from "./api";

export const uploadVideo = async (eventName, videoUri) => {
  const formData = new FormData();

  formData.append("video", {
    uri: videoUri,
    name: `mf360-${Date.now()}.mp4`,
    type: "video/mp4"
  });

  const response = await axios.post(
    `${BASE_URL}/videos/upload/${eventName}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return response.data;
};