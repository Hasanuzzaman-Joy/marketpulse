import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import useImageUpload from "../../../hooks/useImageUpload";
import Swal from "sweetalert2";
import Loading from "../../shared/Loading";
import Button from "../../shared/Button";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { user, loading, setUser, modifiedProfile } = useAuth();
  const { userRole } = useRole();
  const axiosSecure = useAxiosSecure();
  const { imgURL, imgLoading, handleImageUpload } = useImageUpload();

  const [photo, setPhoto] = useState("");
  const [removePhoto, setRemovePhoto] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) return <Loading />;

  const handleChangeImage = async (e) => {
    await handleImageUpload(e);
    setPhoto("");
    setRemovePhoto(false);
  };

  const handleRemoveImage = () => {
    setPhoto("");
    setRemovePhoto(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newPhoto = removePhoto ? null : imgURL || user?.photoURL;
    const updatedName = e.target.name.value;

    try {
      // Update backend
      const res = await axiosSecure.patch(
        `/users/updateProfile?email=${user?.email}`,
        {
          name: updatedName,
          photo: newPhoto,
        }
      );

      // Update in firebase
      if (res.data.modifiedCount > 0) {
        if (modifiedProfile) {
          await modifiedProfile(updatedName, newPhoto);

          // Update user
          if (setUser) {
            setUser({
              ...user,
              displayName: updatedName,
              photoURL: newPhoto,
            });
          }
        }

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been successfully updated.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "Nothing was updated in your profile.",
          confirmButtonColor: "#0a472e",
          cancelButtonColor: "#a8b324",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not update profile.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-body text-main p-6 md:p-10 bg-white rounded shadow-sm w-full mx-auto">
      <div className="mb-8 space-y-2">
        <h2 className="text-3xl text-primary font-bold flex items-center gap-2">
          <FaUserCircle /> My Profile
        </h2>
        <p className="text-text-secondary text-base md:text-lg mb-6">
          View and update your personal information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 max-w-2xl mx-auto"
      >
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <img
            src={
              photo ||
              (!removePhoto && (imgURL || user?.photoURL)) ||
              "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1756625310/hjsdchtjcutflbmbti83.png"
            }
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-border"
          />
          <div className="flex flex-col gap-2">
            <label className="px-4 py-2 bg-accent text-white rounded-md cursor-pointer hover:bg-accent-dark transition text-center">
              {imgLoading ? "Uploading..." : "Change Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChangeImage}
                disabled={imgLoading}
              />
            </label>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="px-4 py-2 bg-pink-100 text-pink-700 rounded-md hover:bg-pink-200 cursor-pointer transition"
            >
              Remove Image
            </button>
          </div>
        </div>

        {/* Name and Email */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col">
            <label className="mb-2 font-medium">Name</label>
            <input
              type="text"
              defaultValue={user?.displayName || ""}
              name="name"
              className="px-6 py-3 border border-border rounded-md bg-white text-main text-base focus:outline-none focus:ring-2 focus:ring-accent cursor-not-allowed"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="mb-2 font-medium">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="px-6 py-3 border border-border rounded-md bg-gray-100 text-main text-base focus:outline-none focus:ring-2 focus:ring-accent cursor-not-allowed"
            />
          </div>
        </div>

        {/* Role */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Role</label>
          <input
            type="text"
            value={userRole || ""}
            disabled
            className="px-6 py-3 border border-border rounded-md bg-gray-100 text-main text-base cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || imgLoading}
          className="px-6 py-3 bg-accent text-white rounded-md hover:bg-accent-dark transition"
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </div>
  );
};

export default Profile;
