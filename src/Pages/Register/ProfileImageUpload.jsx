import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ProfileImageUpload = ({ handleImageUpload, imgLoading }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-1">
        Profile Photo
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        disabled={imgLoading}
        className="file:bg-secondary file:text-white file:cursor-pointer file:px-6 file:py-3 file:border-0 file:mr-3 w-full border border-border rounded-md text-main text-base focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
        required
      />
      {imgLoading && (
        <div className="flex gap-2 text-secondary mt-2">
          <CircularProgress size={20} sx={{ color: "#0a472e" }} />
          Uploading image...
        </div>
      )}
    </div>
  );
};

export default ProfileImageUpload;
