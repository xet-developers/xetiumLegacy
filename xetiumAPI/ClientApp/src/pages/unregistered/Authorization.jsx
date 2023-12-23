import React, {useContext, useState} from 'react';
import {AuthContext} from "../../contex/IsAuth";
import {useNavigate} from "react-router-dom";

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
        <form>
            <input placeholder="userName" type="text" onChange={event => setUserName(event.target.value)}
                   required/>

            <input placeholder="password" type="password" onChange=
                {event => setPassword(event.target.value)} required/>

            <button onClick={sendUserData}>Войти</button>
        </form>
    );
};

export default Authorization;