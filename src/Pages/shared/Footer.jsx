import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Container from "./Container";

const Footer = () => {
  return (
    <footer className="font-body bg-primary text-white">
      {/* === Main Footer === */}
      <Container>
        <div className="relative pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* 1. Logo and About */}
          <div className="relative z-20">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://i.ibb.co/CstBYsHY/trans-logo.png"
                alt="Logo"
                className="w-10 h-10"
              />
              <h1 className="text-2xl font-heading font-bold">
                Market <span className="text-accent">Pulse</span>
              </h1>
            </div>
            <p className="text-base leading-8 mb-4">
              Real-time updates from the heart of the market. Stay informed and
              ahead.
            </p>
            <div className="flex items-center">
              <img
                src="https://i.ibb.co/TxMk98nR/visa.png"
                alt="Visa"
                className="w-12 h-8 object-contain -ml-[10px]"
              />
              <img
                src="https://i.ibb.co/6J4GfQ0Y/mastercard.png"
                alt="MasterCard"
                className="w-12 h-5 object-contain"
              />
              <img
                src="https://i.ibb.co/FG1C4Cy/amex.png"
                alt="Amex"
                className="w-12 h-7 object-contain"
              />
            </div>
          </div>

          {/* 2. Pages */}
          <div className="relative z-20 ml-0 md:ml-20">
            <h4 className="font-semibold text-lg">Pages</h4>
            <div className="w-10 h-[3px] bg-white rounded-full mt-2 mb-4"></div>
            <ul className="space-y-2 text-base">
              <li>
                <Link to="/" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-accent">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Legal */}
          <div className="relative z-20 md:ml-0 lg:ml-8">
            <h4 className="font-semibold text-lg">Legal</h4>
            <div className="w-10 h-[3px] bg-white rounded-full mt-2 mb-4"></div>
            <ul className="space-y-2 text-base">
              <li>
                <Link to="/terms" className="hover:text-accent">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-accent">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Social */}
          <div className="relative z-20 ml-0 md:ml-20 lg:ml-10">
            <h4 className="font-semibold text-lg">Follow Us</h4>
            <div className="w-10 h-[3px] bg-white rounded-full mt-2 mb-4"></div>
            <div className="flex gap-4">
              <Link
                to="https://www.facebook.com/"
                className="bg-accent hover:bg-secondary border border-white text-white p-3 rounded-full"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="https://twitter.com/"
                className="bg-accent hover:bg-secondary border border-white text-white p-3 rounded-full"
              >
                <FaTwitter />
              </Link>
              <Link
                to="https://www.linkedin.com/"
                className="bg-accent hover:bg-secondary border border-white text-white p-3 rounded-full"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* === Bottom Footer === */}
      <div className="bg-secondary text-white py-4 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} <strong>Market Pulse</strong>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
