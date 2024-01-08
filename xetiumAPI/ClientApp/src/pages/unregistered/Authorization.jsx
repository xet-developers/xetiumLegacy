import React, {useContext, useState} from 'react';
import {AuthContext} from "../../contex/IsAuth";
import {useNavigate} from "react-router-dom";
import Styles from "../../styles/authorization.module.css";
import {Link} from "react-router-dom";
import {Requests} from "../../API/Requests";
import {LocalStorageManager} from "../../misc/LocalStorageManager";

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

        const API = new Requests()
        const result = await API.unregisteredPost("account/login", res)

        if(result.ok){
            const respJSON = await result.json()
            LocalStorageManager.setJWT(respJSON.token)
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