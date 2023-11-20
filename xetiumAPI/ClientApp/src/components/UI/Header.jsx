import React from 'react';
import Styles from '../../styles/header.module.css'
import logo from '../../images/logo.svg'
import {Link} from "react-router-dom";
import UIButton from "./UIButton";
import ButtonStyles from "../../styles/UIButton.module.css"

const Header = ({headers}) => {
    return (
        <header className={Styles.header}>
            <img src={logo} alt="Logo" className={Styles.logo}/>
            <div className={Styles.menuItems}>
                {headers.map(el =>
                    <a className={Styles.menuItem} href={el}>{el}</a>)
                }
            </div>

            <div className={Styles.headerRight}>
                <Link
                    to={'/authorization'} className={Styles.headerText}>Вход
                </Link>

                <Link to={'/register'}>
                    <UIButton className={ButtonStyles.advertisingHeader}>
                        <span className={Styles.headerText}>Попробовать бесплатно</span>
                    </UIButton>
                </Link>
            </div>
        </header>
    );
};

export default Header;