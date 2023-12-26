import React, {useState, useEffect, useContext} from 'react';
import Styles from "../../styles/searchPosition.module.css";
import Arrow from "../../images/arrowSeo.svg";
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

                    <input type="checkbox" onClick={()=>setFirstSearchSystem(!firstSearchSystem)}/>
                    <input type="checkbox" onClick={()=>setSecondSearchSystem(!secondSearchSystem)}/>

                    <button
                        className={Styles.sendKey}
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
                                return await fetch('/abc', params)
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