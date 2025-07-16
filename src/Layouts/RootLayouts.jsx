import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Pages/shared/Navbar";
import Footer from "../Pages/shared/Footer";

const RootLayouts = () => {
    return (
        <>
            {/* Navbar */}
            <Navbar />
            {/* Main Outlet */}
            <main>
                <Outlet />
            </main>
            {/* Footer */}
            <Footer />

        </>
    );
};

export default RootLayouts;
