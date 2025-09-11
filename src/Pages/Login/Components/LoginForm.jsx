import React, { useState } from "react";
import Button from "../../shared/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const LoginForm = ({ handleSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Email Address
        </label>
        <input
          name="email"
          type="email"
          aria-label="Email Address"
          placeholder="example@email.com"
          className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main"
          required
        />
      </div>

      <div className="relative">
        <label className="block text-sm font-medium text-text-secondary mb-1">
          Password
        </label>
        <input
          name="password"
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

      <div className="flex justify-between text-sm">
        <Link
          to="/forgot-password"
          className="text-primary hover:text-accent hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <div className="flex gap-2 items-center justify-center">
            <CircularProgress size={20} sx={{ color: "white" }} />
            Logging in...
          </div>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
