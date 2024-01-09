import React, {useState, useEffect, useContext} from 'react';
import Styles from "../../styles/searchPosition.module.css";
import Line from "../../images/line.svg";
import {UserData} from './UserData';
import {CurrentProjectContext} from "../../contex/CurrentProject";
import {Requests} from "../../API/Requests";
import Loader from "../../images/loader.gif";

const API = '';

const SpaceSEO = () => {
    const [inputValue, setInputValue] = useState('');
    const [firstSearchSystem, setFirstSearchSystem] = useState(false)
    const [secondSearchSystem, setSecondSearchSystem] = useState(false)
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)
    const [usersReq, setUsersReq] = useState(currentProject?.searches || [] );
    const [isLoading, setLoading] = useState(false);

    const sendData = async () => {

        const keyWordsArray = inputValue.trim().split(', ')
        const res = {
            projid: currentProject.id,
            uri: currentProject.url,
            keywords: keyWordsArray,
            top: 100,
        }

        const fetchData = async (searchSystem, res) => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 3500);
            res.searchSystem = searchSystem;
            const API = new Requests()
            API.registeredPost('analytics', res)
                .then((res) => res.json())
                .then(respJson => addResp(respJson))
                .then(() => setLoading(false))
                .catch();
        }

        if (firstSearchSystem) {
            await fetchData(0, res);
        }

        if (secondSearchSystem) {
            await fetchData(1, res);
        }
    }

    const addResp = (resp) => {
        console.log(resp)

        setUsersReq(usersReq.concat(resp))
    }

    return (
        <div className={Styles.seo}>
            <section className={Styles.header}>
                <div>
                    <p className={Styles.headerText}>Отслеживание позиций сайта</p>
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
                        Введите запросы - каждый запрос через запятую. 
                    </p>

                    <div style={{display:'flex', flexDirection:'row', columnGap: '30px'}}>
                        <button
                        className={Styles.inputButton2}
                        disabled={inputValue.length === 0}
                        type='button'
                        onClick={sendData}>
                        Отправить
                        </button>

                        <p style={{fontSize:'15px', color: '#757575'}}>{inputValue.split(',').length} / 30</p>
                    </div>
                </div>
            </section>

            { isLoading ? <div className={Styles.loading}><p>Loading...</p><img src={Loader} alt="loader"/></div> : 
                (usersReq?.length !== 0 && <section>
                <table className={Styles.tableSeo}>
                    <thead>
                        <tr>
                            <th className={Styles.nameColumn}>Поисковая система</th>
                            <th className={Styles.nameColumn}>Запрос</th>
                            <th className={Styles.nameColumn}>Позиция</th>
                        </tr>
                    </thead>

                    <tbody>
                        <UserData users={usersReq}/>
                    </tbody>
                </table>
            </section>)}
        </div>
    );
};

export default SpaceSEO;