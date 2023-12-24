import React, {useState, useEffect, useContext} from 'react';
import Styles from "../../styles/searchPosition.module.css";
import Arrow from "../../images/arrowSeo.svg";
import Line from "../../images/line.svg";
import {UserData} from './UserData';
import {CurrentProjectContext} from "../../contex/CurrentProject";

const API = '';

const SpaceSEO = () => {
    const [inputValue, setInputValue] = useState('');
    const [usersReq, setUsersReq] = useState([]);
    const [response, setResponse] = useState({})
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)

    const zatichka = {
        searchsystem: 1,
        positionResult: {
            qwe: 1,
            wer: 2,
            errt: 3,
            qweeq: 4
        }
    }

    const addResp = (resp) => {
        const positionResult = resp?.positionResult;
        console.log(positionResult)
        setUsersReq(usersReq.concat(positionResult))
    }

    return (
        <div>
            <section className={Styles.header}>
                <div>
                    <img src={Arrow} alt="arrow" className={Styles.arrow}/>
                    <p className={Styles.headerText}>Проверка позиций</p>
                    <img src={Line} alt="line" className={Styles.line}/>
                </div>
            </section>

            <section>
                <div>
                    <p className={Styles.h}>Добавление ключевых слов</p>

                    <textarea value={inputValue} onChange={e => setInputValue(e.target.value)} id="keyWords"/>
                    <br/>
                    <label form="keyWords">Каждый запрос с новой строки!</label>
                    <br/>
                    <button
                        className={Styles.sendKey}
                        disabled={inputValue.length === 0}
                        type='button'
                        onClick={async () => {
                            const keyWordsArray = inputValue.trim().split(', ')
                            const res = {
                                projid: 1,
                                uri: currentProject.url,
                                keywords: keyWordsArray,
                                top: 100,
                                searchsystem: 0
                            }
                            console.log(res)
                            const params = {
                                method: 'POST',
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
                                    'Content-Type': "application/problem+json; charset=utf-8"
                                },
                                body: JSON.stringify(res)
                            };

                            const resp = await fetch("abc", params)
                                .catch()
                            const respJson = await resp.json();

                            if (resp.ok) {
                                addResp(respJson)
                            } else {
                                addResp(zatichka)
                            }
                        }}>
                        Отправить
                    </button>

                </div>
            </section>

            <section>
                <table>
                    <thead>
                    <tr>
                        <th>Поисковая система</th>
                        <th>Запрос</th>
                        <th>Позиция</th>
                    </tr>
                    </thead>

                    <tbody>
                    <UserData users={usersReq}/>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default SpaceSEO;