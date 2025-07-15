import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import Button from "../shared/Button";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useSuccessAlert from "../../hooks/useSuccessAlert";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { loading, setLoading, googleSign, login } = useAuth();
  const axiosInstance = useAxios();
  const successSwal = useSuccessAlert();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = "MarketPulse - Login";
  }, []);

  const location = useLocation();
  const from = location.state?.from || "/";

  // Login with google
  const handleGoogle = () => {
    googleSign()
      .then((userCredential) => {
        const user = userCredential.user;
        const lastSignedIn = new Date();

        axiosInstance.patch("/register", { email: user.email, lastSignedIn })
          .then(() => {
            axiosInstance.post("/jwt", { email: user.email })
              .then((res) => {
                if (res.data) {
                  const token = res.data?.token;
                  localStorage.setItem("token", token);
                }
              })
            successSwal({
              title: "Login Successful 🎉",
              text: "Welcome back to MarketPulse!",
              redirectTo: from,
            });
          })
          .catch(() => {
            toast.error("Failed to update last signed-in time.", {
              position: "top-right",
              autoClose: 3000,
              transition: Bounce,
            });
          })
          .finally(() => setLoading(false));
      })
      .catch((error) => {
        toast.error(`Google Sign-In Failed: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
        setLoading(false);
      });
  };

  // Login with form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    login(email, password)
      .then(() => {
        const lastSignedIn = new Date();
        axiosInstance.patch("/register", { email, lastSignedIn })
          .then(() => {
            axiosInstance.post("/jwt", { email })
              .then((res) => {
                if (res.data) {
                  const token = res.data?.token;
                  localStorage.setItem("token", token);
                }
              })
            successSwal({
              title: "Login Successful 🎉",
              text: "Welcome back to MarketPulse!",
              redirectTo: from,
            });
          })
          .catch(() => {
            toast.error("Failed to update last signed-in time.", {
              position: "top-right",
              autoClose: 3000,
              transition: Bounce,
            });
          })
          .finally(() => setLoading(false));
      })
      .catch((error) => {
        toast.error(`Login Failed: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
        setLoading(false);
      });
  };

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
            <h1 className="text-3xl md:text-5xl font-heading font-bold"
              style={{
                WebkitTextStroke: "1px #fff"
              }}>
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

          {/* Google Sign In Button */}
          <Button
            type="button"
            className="w-full flex items-center justify-center gap-3 mb-6"
            aria-label="Sign in with Google"
            onClick={handleGoogle}
            disabled={loading}
          >
            <FcGoogle size={24} />
            <span className="text-white font-medium">Sign in with Google</span>
          </Button>

          {/* Form Start */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Input */}
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

            {/* Password Input */}
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

          {/* Register Redirect */}
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
    </div>
  );
};

export default Login;
