import React from 'react';
import Styles from '../../styles/header.module.css'
import logo from '../../images/logo.svg'
import {Link} from "react-router-dom";

const Header = ({headers}) => {


    return (
        <header className={Styles.header}>
            <img src={logo} alt="Logo" className={Styles.logo}/>
            <div className={Styles.menuItems}>
                {headers.map(el =>
                    <a className={Styles.menuItem} href={el}>{el}</a>)
                }
            </div>
            <div className={Styles.right}>
                dsada
            </div>
        </header>
    );
};

export default Header;