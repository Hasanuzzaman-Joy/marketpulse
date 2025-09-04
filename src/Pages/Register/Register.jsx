import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useSuccessAlert from "../../hooks/useSuccessAlert";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useImageUpload from "../../hooks/useImageUpload";
import GoogleSignUpButton from "./GoogleSignUpButton";
import RegisterForm from "./RegisterForm";

const Register = () => {
  useEffect(() => {
    document.title = "MarketPulse - Register";
  }, []);

  const { loading, setLoading, googleSign, signUp, modifiedProfile } = useAuth();
  const axiosInstance = useAxios();
  const successSwal = useSuccessAlert();
  const navigate = useNavigate();

  // image upload hook
  const { imgURL, imgLoading, handleImageUpload } = useImageUpload();

  // Google Register
  const handleGoogle = () => {
    setLoading(true);
    googleSign()
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userData = {
          name: user.displayName,
          email: user.email,
          photo:
            user.photoURL ||
            "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752397720/caop8dbhrpw73sgdv9kx.jpg",
        };

        try {
          await axiosInstance.post("/register", userData);

          successSwal({
            title: "Registration Successful 🎉",
            text: "Welcome to MarketPulse!",
            redirectTo: "/",
          });
        } catch (error) {
          if (
            error.response?.status === 400 &&
            error.response?.data?.error === "User already exists"
          ) {
            // User already exists
            toast.success("Welcome back! Redirecting to homepage...", {
              position: "top-right",
              autoClose: 2000,
              transition: Bounce,
            });
            setTimeout(() => navigate("/"), 2000);
          } else {
            toast.error(
              "Account created but encountered an issue. Redirecting...",
              {
                position: "top-right",
                autoClose: 2000,
                transition: Bounce,
              }
            );
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

  // Form Register
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // validations
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      setLoading(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    // use uploaded image or fallback
    const imageURL =
      imgURL ||
      "https://res.cloudinary.com/dvkiiyhaj/image/upload/v1752397720/caop8dbhrpw73sgdv9kx.jpg";

    signUp(email, password)
      .then(() => {
        modifiedProfile(name, imageURL);
        successSwal({
          title: "Registration Successful 🎉",
          text: "Welcome to MarketPulse!",
          redirectTo: "/",
        });
      })
      .catch((err) => {
        toast.error(`${err.message}`);
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
            <img
              src="https://i.ibb.co/CstBYsHY/trans-logo.png"
              alt="Logo"
              className="w-20 h-20"
            />
            <h1
              className="text-3xl md:text-5xl font-heading font-bold"
              style={{ WebkitTextStroke: "1px #fff" }}
            >
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
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary text-center">
            Create Your Account 🚀
          </h2>
          <p className="text-base text-center text-text-secondary mt-2 mb-6 leading-6">
            Sign up to personalize your experience, receive live updates, and
            unlock all features of Market Pulse.
          </p>

          <GoogleSignUpButton handleGoogle={handleGoogle} />
          <RegisterForm
            handleSubmit={handleSubmit}
            handleImageUpload={handleImageUpload}
            imgLoading={imgLoading}
            loading={loading}
          />

          <p className="mt-6 text-sm text-center text-text-secondary">
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
