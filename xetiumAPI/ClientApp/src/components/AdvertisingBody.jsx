import React from 'react';
import {Link} from "react-router-dom";
import Styles from '../styles/advertisingBody.module.css'

const AdvertisingBody = () => {
    return (
        <div className={Styles.body}>
            Advertising

            <Link to="/register">dsadada</Link>
        </div>
    );
};

export default AdvertisingBody;