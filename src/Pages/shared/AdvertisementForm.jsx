import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "./Button";
import useImageUpload from "../../hooks/useImageUpload";

const AdvertisementForm = ({ onSubmit, defaultValues = {}, mode = "add", loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const {
    imgURL,
    imgLoading,
    handleImageUpload,
  } = useImageUpload(defaultValues.image);

  const handleFormSubmit = (data) => {
    const { _id, ...restData } = data;
    const newData = { ...restData };

    if (!imgURL && mode === "add") {
      alert("Please upload an image first.");
      return;
    }

    const adData = {
      ...newData,
      image: imgURL || defaultValues.image,
    };

    onSubmit(adData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title */}
      <div className="flex flex-col">
        <label className="mb-1 text-text-secondary font-medium">Advertisement Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="e.g., Fresh Produce Sale"
          className="w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.title && <span className="text-sm text-red-500 mt-1">{errors.title.message}</span>}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="mb-1 text-text-secondary font-medium">Short Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={2}
          placeholder="Describe your ad offer, location, or promotion."
          className="w-full border border-border rounded-md px-6 py-3 text-main text-base resize-none focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {errors.description && <span className="text-sm text-red-500 mt-1">{errors.description.message}</span>}
      </div>

      {/* Image Upload */}
      <div className="flex flex-col">
        <label className="mb-1 text-text-secondary font-medium">Advertisement Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={imgLoading}
          className="file:bg-secondary file:text-white file:cursor-pointer file:px-6 file:py-2 file:border-0 file:mr-3 w-full border border-border rounded-md text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
        />
        {imgLoading && (
          <div className="flex gap-2 text-secondary mt-2">
            <CircularProgress size={20} sx={{ color: "#0a472e" }} />
            Uploading image...
          </div>
        )}
        {/* Preview image*/}
        {(imgURL || defaultValues.image) && (
          <img
            src={imgURL || defaultValues.image}
            alt="Preview"
            className="mt-4 w-30 h-30 rounded border object-cover"
          />
        )}
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={loading || imgLoading}>
        {loading ? (
          <div className="flex gap-2 items-center justify-center">
            <CircularProgress size={20} sx={{ color: "white" }} />
            {mode === "add" ? "Submitting..." : "Updating..."}
          </div>
        ) : mode === "add" ? "Submit Advertisement" : "Update Advertisement"}
      </Button>
    </form>
  );
};

export default AdvertisementForm;
