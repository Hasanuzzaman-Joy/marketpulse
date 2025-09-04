import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({ name }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-text-secondary mb-1">
        Password
      </label>
      <input
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        required
        className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main pr-12"
      />
      <span
        className="absolute right-3 top-[42px] text-text-secondary cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  );
};

export default PasswordInput;
