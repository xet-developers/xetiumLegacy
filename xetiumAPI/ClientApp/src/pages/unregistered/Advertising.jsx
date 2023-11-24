import React from 'react';
import Footer from "../../components/UI/Footer";
import Header from "../../components/UI/Header";
import AdvertisingBody from "../../components/AdvertisingBody";
import Styles from '../../styles/advertising.module.css';

const Advertising = () => {
    const headers = ['О сервисе', 'Инструменты']

    return (
        <div className={Styles.decor}>
            <Header headers={headers}/>
            <AdvertisingBody/>
            <Footer/>
        </div>
    );
};

export default Advertising;