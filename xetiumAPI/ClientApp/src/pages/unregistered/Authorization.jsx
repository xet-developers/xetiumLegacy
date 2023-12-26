import React, {useContext, useState} from 'react';
import {AuthContext} from "../../contex/IsAuth";
import {useNavigate} from "react-router-dom";
import Styles from "../../styles/authorization.module.css"

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
        
        <form className={Styles.form}>
            <p className={Styles.header}>
                Войти
            </p>

            <input placeholder="userName" type="text" onChange={event => setUserName(event.target.value)} className={Styles.userName}
            required/>

            <input className={Styles.userPassword} placeholder="password" type="password" onChange=
                {event => setPassword(event.target.value)} required/>

            <button className={Styles.userIn} onClick={sendUserData}>Перейти</button>
            
        </form>
    );
};

export default Authorization;