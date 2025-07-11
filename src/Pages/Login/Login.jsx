import React from 'react';
import { Link } from 'react-router';

const Login = () => {
  return (
    <div className="min-h-screen grid md:grid-cols-2 font-body">
      {/* Left Section */}
      <div className="bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-6">
        <img
          src="https://i.ibb.co/qMzDfPtX/logo.png"
          alt="MarketPulse"
          className="max-w-sm w-full"
        />
      </div>

      {/* Right Section */}
      <div className="bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-heading text-main mb-6 text-center">
            Welcome Back 👋
          </h2>

          <form className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-main"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-textSecondary mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-main"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-between text-sm">
              <Link to="/forgot-password" className="text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition"
            >
              Login
            </button>
          </form>

          {/* Register Redirect */}
          <p className="mt-6 text-sm text-center text-textSecondary">
            Don’t have an account?{' '}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
