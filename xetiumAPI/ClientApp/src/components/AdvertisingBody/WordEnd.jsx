import React from 'react';
import Styles from "../../styles/advertisingBody.module.css";
import {Link} from "react-router-dom";
import UIButton from "../UI/UIButton";
import arrow from "../../images/Arrow 1.svg";

const ThirdPart = () => {
    return (
        <section>
             <div className={Styles.textSectionThree}>
                <span style={{color: '#F66450'}}>Xetium</span> постоянно развивается <br/>и расширяет свои
                возможности ради вас
            </div>

            <Link to="/register">
                <UIButton className={Styles.buttonProject}>
                    <span className={Styles.buttonTextProject}>Перейти к проектам</span>
                    <img src={arrow} alt="arrow" className={Styles.arrow}/>
                </UIButton>
            </Link>
        </section>
    );
};

export default ThirdPart;