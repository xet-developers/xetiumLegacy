import React from 'react';
import Styles from "../../styles/advertisingBody.module.css";
import {Link} from "react-router-dom";
import UIButton from "../UI/UIButton";
import mainImage from '../../images/mainImage.svg';

const FirstPart = () => {
    return (
        <section className={Styles.body}>
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
            <img src= {mainImage} alt = "mainImage" className={Styles.advertisingPhoto}/>
        </section>
    );
};

export default FirstPart;