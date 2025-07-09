import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar';
import Footer from '../Pages/shared/Footer';

const RootLayouts = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default RootLayouts;