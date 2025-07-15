import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const SidebarFooter = () => {
  return (
    <footer className="bg-white shadow px-6 py-4 flex justify-between items-center border-t text-sm">
      {/* Social Icons */}
      <div className="flex gap-4">
        <a
          href="https://www.facebook.com/"
          className="bg-accent hover:bg-secondary border border-white text-white p-3 rounded-full"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com/"
          className="bg-accent hover:bg-secondary border border-white text-white p-3 rounded-full"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.linkedin.com/"
          className="bg-accent hover:bg-secondary border border-white text-white p-3 rounded-full"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedinIn />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-main font-medium">© 2025 Market Pulse. All rights reserved.</p>
    </footer>
  );
};

export default SidebarFooter;
