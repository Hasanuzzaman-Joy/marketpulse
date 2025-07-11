import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Button from "../shared/Button";

const Contact = () => {
  return (
    <div className="text-main font-body">
      {/* Banner */}
      <div className="relative w-full h-40 md:h-62">
        <img
          src="https://i.ibb.co/TMJmZN8w/contact.jpg"
          alt="Contact Banner"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 flex flex-col justify-center items-center text-white font-heading text-center px-4">
          <p className="text-sm mb-2">
            <Link to="/" className="hover:underline">
              Home
            </Link>{" "}
            &gt;{" "}
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
            Contact Us
          </h2>
        </div>
      </div>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-0 items-stretch md:min-h-[500px]">
        {/* Left Column */}
        <div className="p-6 md:p-16 bg-white space-y-4 flex flex-col justify-center">
          <h3 className="text-2xl md:text-4xl font-heading font-bold text-secondary">
            Leave a Message
          </h3>
          <p className="text-text-secondary text-base leading-8">
            We're happy to connect with you. Whether you're a local vendor, a
            market visitor, or someone looking for real-time price updates, feel
            free to reach out. Drop us a message and our team will respond
            shortly to assist you.
          </p>
          <div className="space-y-4 text-text-secondary text-base">
            <p>
              <strong className="text-secondary">Email:</strong>{" "}
              contact@marketpulse.com
            </p>
            <p>
              <strong className="text-secondary">Phone:</strong> +880 1234 567890
            </p>
          </div>
          <div className="flex gap-4 text-main pt-4">
            <a
              href="#"
              className="bg-secondary hover:bg-accent text-white p-3 rounded-full transition duration-300 shadow"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-secondary hover:bg-accent text-white p-3 rounded-full transition duration-300 shadow"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-secondary hover:bg-accent text-white p-3 rounded-full transition duration-300 shadow"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        {/* Right Column - Form Card */}
        <div className="bg-primary p-6 md:p-16 flex items-center justify-center">
          <div className="w-full max-w-md bg-white rounded shadow-md p-8 mx-auto">
            <h4 className="text-xl font-semibold mb-4 text-main">
              Need Help or Support?
            </h4>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full border border-border px-4 py-2 rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <Button type="submit">Submit</Button>
              <p className="text-sm text-text-secondary mt-2">
                We'll get back to you within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-72 md:h-96">
        <iframe
          title="Gulshan Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.941400159861!2d90.412518!3d23.789386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7bdf3c07ec7%3A0xb06dd54f28e2df5b!2sGulshan%201%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1689516365860!5m2!1sen!2sbd"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
