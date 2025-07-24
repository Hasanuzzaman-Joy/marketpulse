import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Button from "../../../shared/Button";
import "react-toastify/dist/ReactToastify.css";
import useImageUpload from "../../../../hooks/useImageUpload";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const AddAdvertisement = () => {
    useEffect(() => {
        document.title = "MarketPulse - Add Advertisement"
    }, [])
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { imgURL, imgLoading, handleImageUpload } = useImageUpload();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        if (!imgURL) {
            toast.error("Please upload an image first.");
            return;
        }

        const ad = {
            title: data.title,
            description: data.description,
            image: imgURL,
            adCreatedBy: user?.email,
        };

        try {
            await axiosSecure.post(`/advertisements?email=${user?.email}`, ad);
            toast.success("Advertisement Added 🎉", {
                onClose: () => {
                    navigate("/dashboard/my-advertisements");
                },
            });
        } catch {
            toast.error("Failed to submit advertisement.");
        }
    };

    return (
        <div className="w-full mx-auto p-6 md:p-12 bg-white rounded shadow-xl text-main font-body">
            <h3 className="text-3xl font-heading font-bold mb-2 text-secondary">
                Add Advertisement
            </h3>
            <p className="text-text-secondary mb-8 leading-relaxed">
                Promote your market or service by submitting an advertisement. It will go through review before publishing.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Ad Title */}
                <div className="flex flex-col">
                    <label className="mb-1 text-text-secondary font-medium">
                        Advertisement Title
                    </label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        placeholder="e.g., Fresh Produce Sale"
                        className="w-full border border-border rounded-md px-6 py-3 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    {errors.title && (
                        <span className="text-sm text-red-500 mt-1">
                            {errors.title.message}
                        </span>
                    )}
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label className="mb-1 text-text-secondary font-medium">
                        Short Description
                    </label>
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                        })}
                        rows={4}
                        placeholder="Describe your ad offer, location, or promotion."
                        className="w-full border border-border rounded-md px-6 py-3 text-main text-base resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    {errors.description && (
                        <span className="text-sm text-red-500 mt-1">
                            {errors.description.message}
                        </span>
                    )}
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                    <label className="mb-1 text-text-secondary font-medium">
                        Advertisement Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={imgLoading}
                        className="file:bg-secondary file:text-white file:cursor-pointer file:px-6 file:py-2 file:border-0 file:mr-3 w-full border border-border rounded-md text-main text-base focus:outline-none focus:ring-2 focus:ring-accent  cursor-pointer"
                        required
                    />
                    {imgLoading && (
                        <div className="flex gap-2 text-secondary mt-2">
                            <CircularProgress size={20} sx={{ color: "#0a472e" }} />
                            Uploading image...
                        </div>
                    )}
                </div>

                {/* Status */}
                <div className="flex flex-col">
                    <label className="mb-1 text-text-secondary font-medium">
                        Status
                    </label>
                    <input
                        value="pending"
                        readOnly
                        className="w-full border border-border bg-gray-100 text-main font-medium rounded-md px-6 py-3 cursor-not-allowed text-base focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                </div>

                {/* Submit Button */}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <div className="flex gap-2 items-center justify-center">
                            <CircularProgress size={20} sx={{ color: "white" }} />
                            Submitting...
                        </div>
                    ) : (
                        "Submit Advertisement"
                    )}
                </Button>
            </form>

            <ToastContainer />
        </div>
    );
};

export default AddAdvertisement;
