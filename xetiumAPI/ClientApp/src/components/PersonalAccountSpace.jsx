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

            <section>
                <div className={Styles.generalInfo}>
                    <p className={Styles.head}>
                        Основная информация
                    </p>

                    <div>
                        <p className={Styles.data}>
                            Имя пользователя:
                        </p>

                        <p>

                        </p>
                    </div>

                    <div>
                        <p className={Styles.data}>
                            Почта:
                        </p>

                        <p>
                            
                        </p> 
                    </div>

                    <div>
                        <p className={Styles.data}>
                            Дата регистрации:
                        </p>

                        <p>
                            
                        </p> 
                    </div>
                </div>
            </section>

            <section>
                <button>
                    <img src={LogOut} alt="LogOut" className={Styles.logout}></img>
                    <p>Выйти из аккаунта</p>
                </button>
            </section>
        </div>
    );
};

export default PersonalAccountSpace;