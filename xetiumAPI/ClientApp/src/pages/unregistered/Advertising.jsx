import React from 'react';
import Footer from "../../components/UI/Footer";
import {Link} from "react-router-dom";
import Register from "./Register";
import Header from "../../components/UI/Header";
import AdvertisingBody from "../../components/AdvertisingBody";

const Advertising = () => {
    return (
        <div>
            <Header/>
            <AdvertisingBody/>
            <Footer/>
        </div>
    );
};

export default Advertising;