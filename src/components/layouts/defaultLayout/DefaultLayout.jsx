import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";

const DefaultLayout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default DefaultLayout;