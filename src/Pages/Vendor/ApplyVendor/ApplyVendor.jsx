import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import Button from "../../shared/Button";
import axios from "axios";
import { Link } from "react-router";

const ApplyVendor = () => {
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Upload photo to cloudinary or other service
            const photoFile = data.photo[0];
            const imageData = new FormData();
            imageData.append("file", photoFile);
            imageData.append("upload_preset", import.meta.env.VITE_PRESET);
            imageData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
                imageData
            );

            const photoURL = res.data.secure_url;

            // Prepare full data to send
            const vendorData = {
                name: data.name,
                email: user?.email,
                photo: photoURL,
                documentId: data.documentId,
                location: data.location,
                marketName: data.marketName,
                description: data.description,
            };

            // Send vendorData to your backend API here
            // await axios.post('/api/vendors/apply', vendorData);

            alert("Application submitted successfully!");
        } catch (error) {
            console.error("Failed to submit vendor application", error);
            alert("Failed to submit application.");
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
            <div className="w-full md:w-11/12 mx-auto p-6 md:p-12 bg-white rounded shadow mt-10">
                {/* Title and Description Above Form */}
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
                            <label htmlFor="name" className="mb-1 text-text-secondary font-medium">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Full Name"
                                value={user?.displayName || ""}
                                readOnly
                                {...register("name")}
                                className="w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="email" className="mb-1 text-text-secondary font-medium">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                value={user?.email || ""}
                                readOnly
                                {...register("email")}
                                className="w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Photo Upload & Document ID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <div className="flex flex-col">
                            <label htmlFor="photo" className="mb-1 text-text-secondary font-medium">
                                Upload Photo
                            </label>
                            <input
                                id="photo"
                                {...register("photo", { required: "Photo is required" })}
                                name="photo"
                                type="file"
                                accept="image/*"
                                aria-label="Upload profile photo"
                                className="file:bg-primary file:text-white file:cursor-pointer file:px-6 file:py-3 file:border-0 file:mr-3 w-full border border-border rounded-md text-main text-base cursor-pointer"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="documentId" className="mb-1 text-text-secondary font-medium">
                                Document/NID Number
                            </label>
                            <input
                                id="documentId"
                                type="text"
                                placeholder="Document/NID Number"
                                {...register("documentId", { required: "Document ID is required" })}
                                className={`w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent ${errors.documentId ? "border-red-500" : ""
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Location & Market Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="location" className="mb-1 text-text-secondary font-medium">
                                Location
                            </label>
                            <input
                                id="location"
                                type="text"
                                placeholder="Location"
                                {...register("location", { required: "Location is required" })}
                                className={`w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent ${errors.location ? "border-red-500" : ""
                                    }`}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="marketName" className="mb-1 text-text-secondary font-medium">
                                Market Name
                            </label>
                            <input
                                id="marketName"
                                type="text"
                                placeholder="Market Name"
                                {...register("marketName", { required: "Market name is required" })}
                                className={`w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent ${errors.marketName ? "border-red-500" : ""
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className="mb-1 text-text-secondary font-medium">
                            Brief Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Brief Description"
                            {...register("description", { required: "Description is required" })}
                            rows={5}
                            className={`w-full border border-border rounded-md px-6 py-3 text-main text-base resize-none focus:outline-none focus:ring-2 focus:ring-accent ${errors.description ? "border-red-500" : ""
                                }`}
                        />
                    </div>

                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Apply Now"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ApplyVendor;
