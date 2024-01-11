import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/IsAuth";
import {useNavigate} from "react-router-dom";
import Styles from "../../styles/authorization.module.css";
import {Link} from "react-router-dom";
import {Requests} from "../../API/Requests";
import {LocalStorageManager} from "../../misc/LocalStorageManager";
import { Validator } from '../../misc/Validator.js';

const Authorization = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()
    const [dataIsCorrect, setDataIsCorrect] = useState(false)
    const navigate = useNavigate()
    const validator = new Validator()

    const sendUserData = async (event) => {
        event.preventDefault()
        const res = {
            username: userName,
            password: password
        }

        const API = new Requests()
        const result = await API.unregisteredPost("account/login", res)

        if (result.ok){
            const respJSON = await result.json()
            LocalStorageManager.setJWT(respJSON.token)
            LocalStorageManager.setIsAuth(true)
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
                    <div>
                        <input placeholder="Имя пользователя" type="text" onChange={event => setUserName(event.target.value)}
                        required className={Styles.inputData}/>
                        
                    </div>
                    
                    <div>
                        <input placeholder="Пароль" type="password" onChange=
                        {event => setPassword(event.target.value)} required className={Styles.inputData}/>

                    </div>
                    
                </div>

                {!isAuth && 
                    <p style={{fontSize:'12px', width:'300px', height:'40px', marginBottom:'-50px',color:'rgb(246, 100, 80)'}}>
                    Неправильное имя пользователя или пароль!</p>}
                
                <button className={Styles.userIn} onClick={sendUserData}>ВОЙТИ</button>
                
            </form>
        </div>
    ); 
};

export default Authorization;