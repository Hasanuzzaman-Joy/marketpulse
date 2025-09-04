import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import LoginForm from "./LoginForm";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router";

const RightSection = ({ handleGoogle, handleSubmit, loading }) => (
  <div className="bg-white flex items-center justify-center px-6 py-12">
    <div className="w-full md:w-3/4 lg:w-4/5">
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-main text-center">
        Welcome Back 👋
      </h2>

      <p className="text-sm text-center text-text-secondary mt-2 mb-6 leading-6">
        We're excited to see you again. Log in to stay connected, explore
        new updates, and manage your experience with ease.
      </p>

      <GoogleLoginButton handleGoogle={handleGoogle} loading={loading} />

      <LoginForm handleSubmit={handleSubmit} loading={loading} />

      <p className="mt-6 text-sm text-center text-text-secondary">
        Don’t have an account?{" "}
        <Link
          to="/register"
          className="text-primary font-medium hover:text-accent hover:underline"
        >
          Register here
        </Link>
      </p>

      <ToastContainer />
    </div>
  </div>
);

export default RightSection;
