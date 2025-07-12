import React from "react";
import { Link } from "react-router";
import Button from "../shared/Button";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-1 lg:grid-cols-2 font-body">
      {/* Left Section */}
      <div className="flex items-center justify-center p-6 bg-gradient-to-tr from-secondary to-accent">
        <div className="text-white text-center space-y-4">
          <div className="flex flex-col items-center justify-center gap-3">
            <img
              src="https://i.ibb.co/CstBYsHY/trans-logo.png"
              alt="Logo"
              className="w-20 h-20"
            />
            <h1 className="text-3xl md:text-5xl font-heading font-bold">
              Market <span className="text-accent">Pulse</span>
            </h1>
          </div>
          <p className="text-lg w-full md:w-[90%] lg:w-[80%] mx-auto leading-8">
            Create your account to track prices, get alerts, and stay ahead of
            the market — every day, every trade.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full md:w-3/4 lg:w-4/5">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-main text-center">
            Create Your Account 🚀
          </h2>

          <p className="text-sm text-center text-text-secondary mt-2 mb-6 leading-6">
            Sign up to personalize your experience, receive live updates, and
            unlock all features of Market Pulse.
          </p>

          {/* Google Sign Up Button */}
          <Button
            type="button"
            className="w-full flex items-center justify-center gap-3 mb-6"
            aria-label="Sign up with Google"
          >
            <FcGoogle size={24} />
            <span className="text-white font-medium">Sign up with Google</span>
          </Button>

          {/* === Form Start === */}
          <form className="space-y-5" aria-label="Registration form">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                aria-label="Full name"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                aria-label="Email address"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Profile Photo
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  aria-label="Upload profile photo"
                  className="file:bg-primary file:text-white file:cursor-pointer file:px-4 file:py-2 file:border-0 file:mr-3 w-full border border-border rounded-md text-main text-sm cursor-pointer"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                aria-label="Password"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main"
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" aria-label="Register button">
              Register
            </Button>
          </form>

          {/* Login Redirect */}
          <p className="mt-6 text-sm text-center text-textSecondary">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:text-accent hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
