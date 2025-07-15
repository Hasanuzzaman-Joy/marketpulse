import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const SidebarFooter = () => {
    return (
        <footer className="bg-primary text-white shadow text-sm px-6 py-6 md:py-4 flex flex-col md:flex-row justify-between items-center gap-5">
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
            <p className="text-base">© 2025 <strong>Market Pulse</strong>. All rights reserved.</p>
        </footer >
    );
};

export default SidebarFooter;
