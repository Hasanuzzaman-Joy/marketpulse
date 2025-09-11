import React from "react";
import Button from "../../shared/Button";
import ProfileImageUpload from "./ProfileImageUpload";
import PasswordInput from "./PasswordInput";

const RegisterForm = ({
  handleSubmit,
  handleImageUpload,
  imgLoading,
  loading,
}) => {
  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Full Name
        </label>
        <input
          name="name"
          type="text"
          placeholder="John Doe"
          required
          className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          placeholder="example@email.com"
          required
          className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main"
        />
      </div>

      {/* Image Upload */}
      <ProfileImageUpload
        handleImageUpload={handleImageUpload}
        imgLoading={imgLoading}
      />

      {/* Password */}
      <PasswordInput name="password" />

      {/* Submit */}
      <Button type="submit" className="w-full" disabled={loading || imgLoading}>
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
