import React from 'react';
import Footer from "../../components/UI/Footer";
import Styles from '../../styles/tutorial.module.css';
import ProjectMenu from './UI/ProjectMenu';
import {Link} from "react-router-dom";
import UIButton from "./UI/UIButton";

const Tutorial = () => {

    return (

        <div>
            <ProjectMenu/>
            
            <div>
                <h1 className={Styles.tutorial}>
                    <p>Добро пожаловать в сервис анализа позиций сайта!</p>
                    <p>Информация по работе с сервисом:</p>
                </h1>
                <div className={Styles.rectangle}></div>
                <span>
                    <p className={Styles.textForButton}>Как только будете готовы создать проект, нажмите сюда</p>
                    <Link to={'/register'}>
                        <UIButton className={Styles.buttonGo}>
                            <span className={Styles.textGo}>Приступить!</span>
                        </UIButton>
                    </Link>
                </span>
            </div>

            <Footer/>
        </div>
    );
};

export default Tutorial;