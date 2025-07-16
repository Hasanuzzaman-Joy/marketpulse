import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";
import Button from "../../../shared/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ApplyVendor = () => {
  const { user, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [imgLoading, setImgLoading] = useState(false);
  const [imgURL, setImgURL] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleImg = async (e) => {
    const image = e.target.files[0];

    if (!image) {
      toast.error("Please upload a photo");
      return;
    }

    setImgLoading(true);

    try {
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", import.meta.env.VITE_PRESET);
      imageData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        imageData
      );

      setImgURL(res.data.secure_url);
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setImgLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!imgURL) {
      toast.error("Please wait for the photo to upload!");
      return;
    }

    try {
      const vendorData = {
        name: user?.displayName,
        email: user?.email,
        photo: imgURL,
        documentId: data.documentId,
        location: data.location,
        marketName: data.marketName,
        description: data.description,
      };

      await axiosSecure.post(`/vendors/apply?email=${user?.email}`, vendorData);

      Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: "Thank you! We’ll review your vendor request soon.",
        confirmButtonColor: "#10b981",
      });

      navigate("/");
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    }
  };

  return (
    <div className="text-main font-body">
      {/* Banner Section */}
      <div className="relative w-full h-40 md:h-62">
        <img
          src="https://i.ibb.co/TMJmZN8w/contact.jpg"
          alt="Apply as Vendor Banner"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 flex flex-col justify-center items-center text-white font-heading text-center px-4">
          <div className="absolute bottom-0">
            <img
              src="https://i.ibb.co/ynmhfN1Q/ripped-paper-slider-2.png"
              alt=""
            />
          </div>
          <p className="text-sm mb-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link to="/apply-vendor" className="hover:underline">
              Become a Vendor
            </Link>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
            Apply to Become a Vendor
          </h2>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-11/12 mx-auto p-6 md:p-12 bg-white rounded shadow-xl my-10">
        <h3 className="text-3xl font-heading font-bold mb-2 text-secondary">
          Ready to Grow Your Business?
        </h3>
        <p className="text-text-secondary mb-8 leading-relaxed">
          Apply now to become a verified vendor on Market Pulse. Share your
          details below and we will get back to you shortly.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="mb-1 text-text-secondary font-medium"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={user?.displayName || ""}
                readOnly
                {...register("name", { required: "Name is required" })}
                className="w-full border border-border rounded-md px-6 py-3 text-main text-base bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {errors.name && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-1 text-text-secondary font-medium"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                readOnly
                {...register("email", { required: "Email is required" })}
                className="w-full border border-border rounded-md px-6 py-3 text-main text-base bg-gray-100 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {errors.email && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          {/* Photo Upload & Document ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col">
              <label
                htmlFor="photo"
                className="mb-1 text-text-secondary font-medium"
              >
                Upload Photo
              </label>
              <input
                id="photo"
                {...register("photo", { required: "Photo is required" })}
                name="photo"
                type="file"
                accept="image/*"
                onChange={handleImg}
                disabled={imgLoading}
                className={`file:bg-secondary file:text-white file:cursor-pointer file:px-6 file:py-2 file:border-0 file:mr-3 w-full border border-border rounded-md text-main text-base ${
                  loading ? "opacity-50 cursor-wait" : "cursor-pointer"
                }`}
              />
              {imgLoading && (
                <div className="flex gap-2 text-secondary mt-2">
                  <CircularProgress size={20} sx={{ color: "#0a472e" }} />
                  Uploading image...
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="documentId"
                className="mb-1 text-text-secondary font-medium"
              >
                Document/NID Number
              </label>
              <input
                id="documentId"
                type="text"
                placeholder="Document/NID Number"
                {...register("documentId", {
                  required: "Document ID is required",
                })}
                className={`w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.documentId ? "border-red-500" : ""
                }`}
              />
              {errors.documentId && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.documentId.message}
                </span>
              )}
            </div>
          </div>

          {/* Location & Market Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="location"
                className="mb-1 text-text-secondary font-medium"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                placeholder="Location"
                {...register("location", { required: "Location is required" })}
                className={`w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.location ? "border-red-500" : ""
                }`}
              />
              {errors.location && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.location.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="marketName"
                className="mb-1 text-text-secondary font-medium"
              >
                Market Name
              </label>
              <input
                id="marketName"
                type="text"
                placeholder="Market Name"
                {...register("marketName", {
                  required: "Market name is required",
                })}
                className={`w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent ${
                  errors.marketName ? "border-red-500" : ""
                }`}
              />
              {errors.marketName && (
                <span className="text-sm text-red-500 mt-1">
                  {errors.marketName.message}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-1 text-text-secondary font-medium"
            >
              Brief Description
            </label>
            <textarea
              id="description"
              placeholder="Brief Description"
              {...register("description", {
                required: "Description is required",
              })}
              rows={5}
              className={`w-full border border-border rounded-md px-6 py-3 text-main text-base resize-none focus:outline-none focus:ring-2 focus:ring-accent ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <span className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </span>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex gap-2 items-center justify-center">
                <CircularProgress size={20} sx={{ color: "white" }} />
                Submitting...
              </div>
            ) : (
              "Apply Now"
            )}
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApplyVendor;
