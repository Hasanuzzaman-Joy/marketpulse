import React from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../../hooks/useAuth";
import VendorForm from "./VendorForm";

const ApplyVendor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="text-main font-body">
      {/* Banner Section */}
      <div className="relative w-full h-40 md:h-62">
        <img
          src="https://i.ibb.co/TMJmZN8w/contact.jpg"
          alt="Apply as Vendor Banner"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 flex flex-col justify-center items-center text-white font-heading text-center px-4">
          <div className="absolute bottom-0">
            <img
              src="https://i.ibb.co/ynmhfN1Q/ripped-paper-slider-2.png"
              alt=""
            />
          </div>
          <p className="text-sm mb-2">
            <Link to="/" className="hover:underline">Home</Link> &gt;{" "}
            <Link to="/apply-vendor" className="hover:underline">Become a Vendor</Link>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
            Apply to Become a Vendor
          </h2>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:max-w-screen-xl mx-auto p-4 md:p-12 bg-white rounded shadow-xl my-10">
        <h3 className="text-3xl font-heading font-bold mb-2 text-secondary">
          Ready to Grow Your Business?
        </h3>
        <p className="text-text-secondary mb-8 leading-relaxed">
          Apply now to become a verified vendor on Market Pulse. Share your
          details below and we will get back to you shortly.
        </p>

        {/* Form */}
        <VendorForm user={user} navigate={navigate} />
      </div>

      <ToastContainer />
    </section>
  );
};

export default ApplyVendor;
