import React from "react";
import { Outlet, useNavigation } from "react-router";
import Navbar from "../Pages/shared/Navbar";
import Footer from "../Pages/shared/Footer";
import ScrollToTop from "../Pages/shared/ScrollToTop";
import Loading from "../Pages/shared/Loading";

const RootLayouts = () => {
    const navigation = useNavigation();
    return (
        <>
            {navigation.state === "loading" && <Loading />}
            <ScrollToTop />
            {/* Navbar */}
            <Navbar />
            {/* Outlet */}
            <main>
                <Outlet />
            </main>
            {/* Footer */}
            <Footer />

        </>
    );
};

export default RootLayouts;
