import React, {useState} from 'react';
import './Register-authentication.css';
import {Await} from "react-router-dom";

const Register = () => {
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [secPassword, setSecPassword] = useState("");
    let [checkboxData, setCheckboxData] = useState(false);
    let [checkboxConf, setCheckboxConf] = useState(false);
    let [checkboxSpam, setCheckboxSpam] = useState(false)

    return (
        <div>
        <form className="register-Field" id = "form">

            <div className="register-Field-left">
                <div className="register-Field-left-header">
                    <h1>Регистрация</h1>
                    <p>Уже есть аккаунт? <a href="#">Войти</a></p>
                </div>

                <input placeholder="Имя пользователя" type="text" value = { name } maxLength = "20" id = "name" pattern = "[A-Za-z]{5,20}" title = "Минимум 5 символов" required
                       onChange = {event => setName(event.target.value)} />
                
                <input placeholder = "Е-mail" type = "email" name = "email" pattern = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" required />
                
                <input placeholder = "Пароль" type = "password" id = "password" name = "password" minLength = "8" maxLength = "16"
                       value = {password} /*pattern = ""/*"/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,20}/" */
                       title = "Длина от 8 до 16 символов, должна быть заглавная буква и спец.символ" required
                       onChange = {event => setPassword(event.target.value)}/>

                <input placeholder = "Повторите пароль" type = "password" id = "secpass" name = "secpassword" minLength = "8"
                       maxLength = "16" value = {secPassword} /*pattern = ""/*"/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,20}/" */
                       title = "Пароли не совпадают" required
                       onChange = {event => setSecPassword(event.target.value)}/>
                
            </div>

            <div className="register-Field-right">
                <div>
                    <input type="checkbox" id="checkboxData" name="checkboxData" value = {true} required
                    onChange = {event => setCheckboxData(checkboxData = !checkboxData)}/>
                    <label htmlFor="checkboxData">Даю свое согласие на обработку персональных данных</label>
                </div>
                <div>
                    <input type="checkbox" id="checkboxConf" name="checkboxConf" value = {true} required
                    onChange = {event => setCheckboxConf(checkboxConf = !checkboxConf)}/>
                    <label htmlFor="checkboxConf">Согласен с условиями пользования и политикой конфиденциальности
                    </label>
                </div>
                <div>
                    <input type="checkbox" id="checkboxSpam" name="checkboxSpam" value = {true}
                    onChange = {event => setCheckboxSpam(checkboxSpam = !checkboxSpam)}/>
                    <label htmlFor="checkboxSpam">Хочу получать вашу информационную рассылку
                    </label>
                </div>
            </div>
            <input placeholder = "Е-mail" type = "email" name = "email" required />
        </form>
        sendData();
        <button id = "register-button" value = "Зарегистрироваться" onClick = {sendData}>ryjgrf</button>
        </div>)

    async function sendData() {
        if (true/*IsNameCorrect(name) &&
            IsEmailCorrect(email) &&
            IsPasswordCorrect(password) &&
            IsSecPasswordCorrect(password, secPassword) &&
            IsCheckboxDataCorrect(checkboxData) &&
            IsCheckboxConfCorrect(checkboxConf)*/) {

            const res = {
                name: name,
                email: email,
                password: password,
                checkboxData: checkboxData,
                checkboxConf: checkboxConf,
                checkboxSpam: checkboxSpam
            }

            const b = document.querySelector("#form")
            const a = new FormData(b)
            console.log(a);
            console.log(b);

            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': "application/problem+json; charset=utf-8"
                },
                body: JSON.stringify(a)
            };
            console.log(res)
        
        
            let result = await fetch("register", params)
            console.log(await result.text())
        }
    }

    function IsNameCorrect(name) {
        const myRe = new RegExp("^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$")

        if (name.trim().length === 0) {
            return false
        }

        if (!myRe.test(name)) {
            console.log("dada")
            return false
        }

        return true
    }

    function IsEmailCorrect(email) {
        const myRe = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");

        if (email.trim().length === 0) {
            return false
        }

        if (!myRe.test(email)) {
            return false
        }

        return true
    }

    function IsPasswordCorrect(password) {
        const myRe = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,20}/);

        if (password.trim().length === 0) {
            return false
        }

        if (!myRe.test(password)) {
            return false
        }

        return true
    }

    function IsSecPasswordCorrect(password, secPassword) {

        if (password !== secPassword) {
            return false
        }

        return true
    }

    function IsCheckboxDataCorrect(Data) {

        return Data
    }

    function IsCheckboxConfCorrect(Conf) {

        return Conf
    }
};

export default Register;