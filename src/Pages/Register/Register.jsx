import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../shared/Button";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useSuccessAlert from "../../hooks/useSuccessAlert";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { loading, setLoading, googleSign, signUp, modifiedProfile } = useAuth();
  const axiosInstance = useAxios();
  const successSwal = useSuccessAlert();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MarketPulse - Register";
  }, []);

  // Register with google
  const handleGoogle = () => {
    setLoading(true);
    googleSign()
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL || "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752397720/caop8dbhrpw73sgdv9kx.jpg",
        };

        try {
          // Try to register the user
          await axiosInstance.post("/register", userData);

          // Get JWT token after successful registration
          const jwtResponse = await axiosInstance.post("/jwt", { email: user.email });
          localStorage.setItem("token", jwtResponse.data?.token);

          // Show success and redirect
          successSwal({
            title: "Registration Successful 🎉",
            text: "Welcome to MarketPulse!",
            redirectTo: "/",
          });
        } catch (error) {
          if (error.response?.status === 400 && error.response?.data?.error === "User already exists") {
            // User exists - get JWT and redirect to home
            const jwtResponse = await axiosInstance.post("/jwt", { email: user.email });
            localStorage.setItem("token", jwtResponse.data?.token);

            toast.success("Welcome back! Redirecting to homepage...", {
              position: "top-right",
              autoClose: 2000,
              transition: Bounce,
            });
            setTimeout(() => navigate("/"), 2000);
          } else {
            // Other errors - still redirect but show message
            toast.error("Account created but encountered an issue. Redirecting...", {
              position: "top-right",
              autoClose: 2000,
              transition: Bounce,
            });
            setTimeout(() => navigate("/"), 2000);
          }
        }
      })
      .catch((err) => {
        toast.error(`Google Sign-in Failed: ${err.message}`, {
          position: "top-right",
          autoClose: 3000,
          transition: Bounce,
        });
      })
      .finally(() => setLoading(false));
  };

  // Register with form
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photo.value.trim();

    // Password Validations 
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      setLoading(false);
      return;
    }


    const imageURL =
      photoURL ||
      "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752397720/caop8dbhrpw73sgdv9kx.jpg";

    const userData = { name, email, photo: imageURL };

    // SignUp Process 
    signUp(email, password)
      .then(() => {
        modifiedProfile(name, imageURL)
        axiosInstance.post("/register", userData)
          .then(() => {
            axiosInstance.post("/jwt", { email })
              .then((res) => {
                if (res.data) {
                  const token = res.data?.token;
                  localStorage.setItem("token", token);
                }
              })
            successSwal({
              title: "Registration Successful 🎉",
              text: "Welcome to MarketPulse!",
              redirectTo: "/",
            });
          });
      })
      .catch((err) => {
        toast.error(`${err.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-1 lg:grid-cols-2 font-body">
      {/* Left Section */}
      <div className="flex items-center justify-center p-6 bg-gradient-to-tr from-secondary to-accent">
        <div className="text-white text-center space-y-4">
          <div className="flex flex-col items-center justify-center gap-3">
            <img src="https://i.ibb.co/CstBYsHY/trans-logo.png" alt="Logo" className="w-20 h-20" />
            <h1 className="text-3xl md:text-5xl font-heading font-bold"
              style={{
                WebkitTextStroke: "1px #fff"
              }}>
              Market <span className="text-accent">Pulse</span>
            </h1>
          </div>
          <p className="text-lg w-full md:w-[90%] lg:w-[80%] mx-auto leading-8">
            Create your account to track prices, get alerts, and stay ahead of the market — every day, every trade.
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
            Sign up to personalize your experience, receive live updates, and unlock all features of Market Pulse.
          </p>

          {/* Google Sign Up Button */}
          <Button
            onClick={handleGoogle}
            type="button"
            className="w-full flex items-center justify-center gap-3 mb-6"
            aria-label="Sign up with Google"
          >
            <FcGoogle size={24} />
            <span className="text-white font-medium">Sign up with Google</span>
          </Button>

          {/* Form Start */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
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
              <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="example@email.com"
                required
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main"
              />
            </div>

            {/* Profile Photo URL */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Profile Photo URL (Optional)</label>
              <input
                name="photo"
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent text-main"
              />
            </div>

            {/* Password */}
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

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <div className="flex gap-2 items-center justify-center">
                  <CircularProgress size={20} sx={{ color: 'white' }} />
                  Registering...
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </form>

          <p className="mt-6 text-sm text-center text-text-secondary">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:text-accent hover:underline">
              Login here
            </Link>
          </p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
