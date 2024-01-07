import React, {useContext, useState} from 'react';
import {AuthContext} from "../../contex/IsAuth";
import {useNavigate} from "react-router-dom";
import Styles from "../../styles/authorization.module.css";
import {Link} from "react-router-dom";

const Authorization = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const sendUserData = async (event) => {
        event.preventDefault()
        const res = {
            username: userName,
            password: password
        }

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': "application/problem+json; charset=utf-8"
            },
            body: JSON.stringify(res)
        };

        const resp = await fetch("account/login", params)

        if(resp.ok){
            const respJSON = await resp.json()
            localStorage.setItem("jwt", respJSON.token)
            navigate("/")
            setIsAuth(true)
        }
    }

    return (
        <div className={Styles.bodyPart}>
            <form className={Styles.form}>
                <p className={Styles.header}>
                    <h1>Авторизация</h1>
                    <p className={Styles.headerP}>Еще нет акканута? <Link to="/register" className={Styles.headerA}>Зарегистрироваться</Link></p>
                </p>

                <div className={Styles.inputDiv}>
                    <input placeholder="Имя пользователя" type="text" onChange={event => setUserName(event.target.value)}
                        required className={Styles.inputData}/>

                    <input placeholder="Пароль" type="password" onChange=
                        {event => setPassword(event.target.value)} required className={Styles.inputData}/>
                </div>
                
                <button className={Styles.userIn} onClick={sendUserData}>ВОЙТИ</button>
                
            </form>
        </div>
    ); 
};

export default Authorization;