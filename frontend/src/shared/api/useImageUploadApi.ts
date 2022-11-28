import axios from "axios";

// admin
export const useImageUploadApi = () => {
  return async (image: FormData) => {
    const resp = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`, image);
    return resp.data;
  };
};
