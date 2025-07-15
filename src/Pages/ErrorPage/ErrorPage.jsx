import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/Error.json";
import { Link } from "react-router";
import Button from "../shared/Button";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const ErrorPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full flex flex-col justify-center items-center bg-bg-light text-center px-4 font-body">
                {/* Lottie Animation */}
                <div className="w-full h-full md:w-90 md:h-80 mb-4 md:mb-10">
                    <Lottie animationData={errorAnimation} loop={true} />
                </div>

                {/* Error Text */}
                <h2 className="text-2xl md:text-4xl font-heading font-bold text-main mb-3">
                    Oops! Page Not Found 😕
                </h2>
                <p className="text-text-secondary text-base md:text-lg mb-6 leading-relaxed w-full md:w-2/3 lg:w-2/4">
                    The page you’re looking for doesn’t exist or was moved. Let’s take you back to a safe place.
                </p>

                {/* Back Home Button */}
                <Link to="/">
                    <Button className="px-6 py-2">Go Back Home</Button>
                </Link>
            </div>
            <Footer />
        </>
    );
};

export default ErrorPage;
