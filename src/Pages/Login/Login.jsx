import React from "react";
import { Link } from "react-router";
import Button from "../shared/Button";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-1 lg:grid-cols-2 font-body">
      {/* Left Section */}
      <div className="flex items-center justify-center p-6 bg-gradient-to-tr from-secondary to-accent">
        <div className="text-white text-center space-y-4">
          {/* Logo */}
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
          {/* Slogan */}
          <p className="text-lg w-full md:w-[90%] lg:w-[80%] mx-auto leading-8">
            Get instant access to real-time market prices, expert insights, and
            exclusive tools to help you stay ahead — every day, every trade.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full md:w-3/4 lg:w-4/5">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-main text-center">
            Welcome Back 👋
          </h2>

          <p className="text-sm text-center text-text-secondary mt-2 mb-6 leading-6">
            We're excited to see you again. Log in to stay connected, explore
            new updates, and manage your experience with ease.
          </p>

          {/* Google Sign Up Button */}
          <Button
            type="button"
            className="w-full flex items-center justify-center gap-3 mb-6"
            aria-label="Sign up with Google"
          >
            <FcGoogle size={24} />
            <span className="text-white font-medium">Sign in with Google</span>
          </Button>

          <form className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Email Address
              </label>
              <input
                type="email"
                aria-label="Email Address"
                placeholder="example@email.com"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Password
              </label>
              <input
                type="password"
                aria-label="Password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-between text-sm">
              <Link
                to="/forgot-password"
                className="text-primary hover:text-accent hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          {/* Register Redirect */}
          <p className="mt-6 text-sm text-center text-textSecondary">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-medium hover:text-accent hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
