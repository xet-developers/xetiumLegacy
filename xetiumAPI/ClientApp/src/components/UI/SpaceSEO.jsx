import React, {useState, useEffect, useContext} from 'react';
import Styles from "../../styles/searchPosition.module.css";
import Line from "../../images/line.svg";
import {UserData} from './UserData';
import {CurrentProjectContext} from "../../contex/CurrentProject";

const API = '';

const SpaceSEO = () => {
    const [inputValue, setInputValue] = useState('');
    const [firstSearchSystem, setFirstSearchSystem] = useState(false)
    const [secondSearchSystem, setSecondSearchSystem] = useState(false)
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)
    const [usersReq, setUsersReq] = useState(currentProject?.searches || [] );


    const addResp = (resp) => {
        console.log(resp)

        setUsersReq(usersReq.concat(resp))
    }

    return (
        <div className={Styles.seo}>
            <section className={Styles.header}>
                <div>
                    <p className={Styles.headerText}>Проверка позиций</p>
                    <img src={Line} alt="line" className={Styles.line}/>
                </div>
            </section>

            <section className={Styles.start}>
                <div className={Styles.input}>
                    <p className={Styles.Head}>
                        Добавление ключевых слов
                    </p>

                    <div className={Styles.checkboxes}>
                        <p className={Styles.inputWarning}>
                            Выберите поисковую систему:
                        </p>

                        <p className={Styles.inputWarning}>
                            Yandex
                            <input type="checkbox" onClick={()=>setFirstSearchSystem(!firstSearchSystem)}/>
                        </p>

                        <p className={Styles.inputWarning}>
                            Google
                            <input type="checkbox" onClick={()=>setSecondSearchSystem(!secondSearchSystem)}/>
                        </p>
                    </div>
                    
                    <textarea className={Styles.textInputSeo} value={inputValue} onChange={e => setInputValue(e.target.value)} id="keyWords"/>

                    <p className={Styles.inputWarning}>
                        Введите запросы - каждый запрос с новой строки. 
                    </p>

                    

                    <button
                        className={Styles.inputButton2}
                        disabled={inputValue.length === 0}
                        type='button'
                        onClick={async () => {
                            const keyWordsArray = inputValue.trim().split(', ')
                            const res = {
                                projid: currentProject.id,
                                uri: currentProject.url,
                                keywords: keyWordsArray,
                                top: 100,
                            }

                            const fetchData = async (searchSystem, res) => {
                                res.searchSystem = searchSystem;
                                console.log(res)
                                const params = {
                                    method: 'POST',
                                    headers: {
                                        'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
                                        'Content-Type': "application/problem+json; charset=utf-8"
                                    },
                                    body: JSON.stringify(res)
                                };
                                return await fetch('/analytics', params)
                                    .then((res) => res.json())
                                    .then(respJson => addResp(respJson))
                                    .catch();
                            }

                            const requests = [];
                            if (firstSearchSystem) {
                                requests.push(fetchData(0, res));
                            }

                            if (secondSearchSystem) {
                                requests.push(fetchData(1, res));
                            }
                        }}>
                        Отправить
                    </button>
                </div>
            </section>

            <section>
                <table className={Styles.tableSeo}>
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