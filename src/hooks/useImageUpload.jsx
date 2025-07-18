import { useState } from "react";
import { toast } from "react-toastify";

const useImageUpload = () => {
  const [imgURL, setImgURL] = useState("");
  const [imgLoading, setImgLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const image = e.target.files?.[0];
    if (!image) return;

    setImgLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", import.meta.env.VITE_PRESET);
    formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      setImgURL(data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed");
    } finally {
      setImgLoading(false);
    }
  };

  return { imgURL, imgLoading, handleImageUpload, setImgURL };
};

export default useImageUpload;
