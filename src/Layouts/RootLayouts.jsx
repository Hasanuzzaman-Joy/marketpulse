import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/shared/Navbar";
import Footer from "../Pages/shared/Footer";

const RootLayouts = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />
            {/* Main Outlet */}
            <main className="flex-grow">
                <Outlet />
            </main>
            {/* Footer */}
            <Footer />

        </div>
    );
};

export default RootLayouts;
