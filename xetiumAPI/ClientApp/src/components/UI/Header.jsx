import React from 'react';
import Styles from '../../styles/header.module.css'
import logo from '../../images/logo.svg'
import {Link} from "react-router-dom";
import UIButton from "./UIButton";
import ButtonStyles from "../../styles/UIButton.module.css"

const Header = ({headers}) => {
    return (
        <header className={Styles.header}>
            <img src={logo} alt="Logo"/>
            <div className={Styles.menuItems}>
                <a className={Styles.menuItem} href='#meeting'>О сервисе</a>
                <a className={Styles.menuItem} href='#function'>Инструменты</a>
            </div>

            <div className={Styles.headerRight}>
                <Link
                    to={'/authorization'} className={Styles.headerText}>Вход
                </Link>

                <Link to={'/register'}>
                    <UIButton className={ButtonStyles.advertisingHeader}>
                        <span className={Styles.headerText2}>Попробовать бесплатно</span>
                    </UIButton>
                </Link>
            </div>
        </header>
    );
};

export default Header;