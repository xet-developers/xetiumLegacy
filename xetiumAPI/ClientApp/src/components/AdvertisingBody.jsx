import React from 'react';
import {Link} from "react-router-dom";
import Styles from '../styles/advertisingBody.module.css';
import UIButton from "./UI/UIButton";
import emptyImage from '../images/background-head.png';

const AdvertisingBody = () => {
    return (
        <div className={Styles.body}>
            <div>
                <p className={Styles.nameService}>Xetium</p>
                <h1 className={Styles.advertisingH1}>
                    <span>Лучший помощник</span>
                    <br></br>
                    <span style = {{color: '#F66450'}}>в SEO-продвижении</span>
                    <br></br>
                    <span>вашего проекта</span>
                </h1>
                <br></br>
                <p className={Styles.advertisingDescription}>
                    Проверка позиции сайта в поисковых системах,<br></br>
                    составление семантического ядра для сервиса и<br></br>
                    впоследствии еще больше удобных инструментов<br></br>
                    в развивающемся проекте.
                </p>
                <Link to="/register">
                    <UIButton className={Styles.buttonFree}>
                        <span className={Styles.nameButtonFree}>Попробовать бесплатно</span>
                    </UIButton>
                </Link>
            </div>
            <img scr = { emptyImage} alt = "emptyAboba" className={Styles.advertisingPhoto}/>
        </div>
    );
};

export default AdvertisingBody;