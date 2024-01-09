import React, {useContext, useEffect, useState} from 'react';
import Styles from "../styles/personalAccount.module.css";
import Line from "../images/line.svg";
import LogOut from "../images/logout.svg";
import {Requests} from "../API/Requests";
import {LocalStorageManager} from "../misc/LocalStorageManager";
import {AuthContext} from "../contex/IsAuth";

const PersonalAccountSpace = () => {
    const [userInfo, setUserInfo] = useState({})
    const {isAuth, setIsAuth} = useContext(AuthContext)


    useEffect(() => {
        const API = new Requests()
        API.registeredGet("/account/info")
            .then(res => res.json())
            .then(json => {
                const date = new Date(json?.dateTime)

                json.dateTime =  date.getDate() + '.' +
                    date.getMonth() + 1 + '.' +
                    date.getFullYear()

                setUserInfo(json)
            })
    }, [])

    const leaveAcc = () => {
        LocalStorageManager.setJWT('')
        LocalStorageManager.setIsAuth(false)
        setIsAuth(false)
    }

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
                    <p className={Styles.headMain}>
                        Основная информация
                    </p>

                    <div>
                        <p className={Styles.data}>
                            Имя пользователя:
                        </p>

                        <p className={Styles.dataspace}>{userInfo?.userName}</p>
                    </div>

                    <div>
                        <p className={Styles.data}>
                            Почта:
                        </p>

                        <p className={Styles.dataspace}>{userInfo?.mail}</p>
                    </div>

                    <div>
                        <p className={Styles.data}>
                            Дата регистрации:
                        </p>

                        <p className={Styles.dataspace}>{userInfo?.dateTime}</p>
                    </div>

                    <button className={Styles.logoutButton} onClick={leaveAcc}>
                        <img src={LogOut} alt="LogOut"></img>
                        <p className={Styles.logoutText}>Выйти из аккаунта</p>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PersonalAccountSpace;