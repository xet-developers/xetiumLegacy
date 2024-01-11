import React from 'react';
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";
import AdvertisingBody from "../../components/AdvertisingBody";
import Styles from '../../styles/advertising.module.css';

const Advertising = () => {
    return (
        <html className={Styles.decor}>
            <Header/>
            <AdvertisingBody/>
            <Footer/>
        </html>
    );
};

export default Advertising;