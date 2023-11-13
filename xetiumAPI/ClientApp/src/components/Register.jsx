import React, {useState} from 'react';
import './main.css';
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
        <section className="register-Field">
            <div className="register-Field-left">
                <div className="register-Field-left-header">
                    <h1>Регистрация</h1>
                    <p>Уже есть аккаунт? <a href="#">Войти</a></p>
                </div>

                <input placeholder="Имя пользователя" type="text" value={name} maxLength="20" id="name"
                       onChange={event => setName(event.target.value)}/>

                <input placeholder="Почта" type="email" value={email} name="email"
                       onChange={event => setEmail(event.target.value)}/>

                <input placeholder="Пароль" type="password" id="pass" name="password" minLength="8" maxLength="16"
                       required
                       value={password} onChange={event => setPassword(event.target.value)}/>

                <input placeholder="Повторите пароль" type="password" id="secpass" name="secpassword" minLength="8"
                       maxLength="16" required
                       value={secPassword} onChange={event => setSecPassword(event.target.value)}/>

                <input id="register-button" type="submit" value="Зарегистрироваться" onClick={sendData}/>
            </div>

            <div className="register-Field-right">
                <div>
                    <input type="checkbox" id="checkboxData" name="checkboxData" onChange={event =>
                        setCheckboxData(checkboxData = !checkboxData)}/>
                    <label htmlFor="checkboxData">Даю свое согласие на обработку персональных данных</label>
                </div>
                <div>
                    <input type="checkbox" id="checkboxConf" onChange={event =>
                        setCheckboxConf(checkboxConf = !checkboxConf)}/>
                    <label htmlFor="checkboxConf">Согласен с условиями пользования и политикой конфиденциальности
                    </label>
                </div>
                <div>
                    <input type="checkbox" id="checkboxSpam" onChange={event =>
                        setCheckboxSpam(checkboxSpam = !checkboxSpam)}/>
                    <label htmlFor="checkboxSpam">Хочу получать вашу информационную рассылку
                    </label>
                </div>

            </div>
        </section>)

    async function sendData() {
        if (IsNameCorrect(name) &&
            IsEmailCorrect(email) &&
            IsPasswordCorrect(password) &&
            IsSecPasswordCorrect(password, secPassword) &&
            IsCheckboxDataCorrect(checkboxData) &&
            IsCheckboxConfCorrect(checkboxConf)) {

            const res = {
                name: name,
                email: email,
                password: password,
                checkboxData: checkboxData,
                checkboxConf: checkboxConf,
                checkboxSpam: checkboxSpam
            }

            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': "application/problem+json; charset=utf-8"
                },
                body: JSON.stringify(res)
            };
            console.log(res)
        
        
            let result = await fetch("register", params)
            console.log(await result.text())
            
            //.then(сохранить jwt);
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