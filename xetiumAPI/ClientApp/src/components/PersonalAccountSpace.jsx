import React, {useState, useEffect} from 'react';
import Styles from "../styles/personalAccount.module.css";
import Line from "../images/line.svg";
import LogOut from "../images/logout.svg";

const PersonalAccountSpace = () => {

    return (
        <div className={Styles.generalPersonalAccount}>
            <section className={Styles.header}>
                <div>
                    <p className={Styles.headerText}>Личный кабинет</p>
                    <img src={Line} alt="line" className={Styles.line}/>
                </div>
            </section>

            <section className={Styles.pa}>
                <div className={Styles.generalInfo}>
                    <p className={Styles.headMain}>
                        Основная информация
                    </p>

                    <div>
                        <p className={Styles.data}>
                            Имя пользователя:
                        </p>

                        <p className={Styles.dataspace}></p>
                    </div>

                    <div>
                        <p className={Styles.data}>
                            Почта:
                        </p>

                        <p className={Styles.dataspace}></p> 
                    </div>

                    <div>
                        <p className={Styles.data}>
                            Дата регистрации:
                        </p>

                        <p className={Styles.dataspace}></p> 
                    </div>

                    <button className={Styles.logoutButton}>
                        <img src={LogOut} alt="LogOut" className={Styles.logout}></img>
                        <p className={Styles.logoutText}>Выйти из аккаунта</p>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PersonalAccountSpace;