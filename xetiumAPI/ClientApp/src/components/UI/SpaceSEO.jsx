import React, {useState, useEffect, useContext} from 'react';
import Styles from "../../styles/searchPosition.module.css";
import Line from "../../images/line.svg";
import {UserData} from './UserData';
import {CurrentProjectContext} from "../../context/CurrentProject";
import {Requests} from "../../API/Requests";
import Loader from "../../images/loader.gif";
import StylesCP from "../../styles/currentProject.module.css";
import { Validator } from '../../misc/Validator.js';

const API = '';

const SpaceSEO = () => {
    const [inputValue, setInputValue] = useState('');
    const [firstSearchSystem, setFirstSearchSystem] = useState(false)
    const [secondSearchSystem, setSecondSearchSystem] = useState(false)
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)
    const [usersReq, setUsersReq] = useState(currentProject?.searches || [] );
    const [isLoading, setLoading] = useState(false);
    const [value, setValue] = useState();
    const [validateInputValue, setValidateInputValue] = useState(false)
    const [validateSystem, setValidateSystem] = useState(false)

    const sendData = async () => {

        if (validate()) {
            const keyWordsArray = inputValue.trim().split(', ')
            const res = {
                projid: currentProject.id,
                uri: currentProject.url,
                keywords: keyWordsArray,
                top: 100,
            }

            const fetchData = async (searchSystem, res) => {
                setLoading(true);

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
    }

    function changeValueFirst(evt) {
        setValue(evt.target.value);
        setFirstSearchSystem(true);
        setSecondSearchSystem(false);
    }

    function changeValueSecond(evt) {
        setValue(evt.target.value);
        setSecondSearchSystem(true);
        setFirstSearchSystem(false);
    }

    const addResp = (resp) => {
        console.log(resp)
        setUsersReq(usersReq.concat(resp))
    }

    function validate() {
        let inv = Validator.validateInputValue(inputValue)
        let sys = firstSearchSystem || secondSearchSystem;

        setValidateInputValue(!inv)
        setValidateSystem(!sys)

        return inv && sys;
    }

    return (
        <div className={Styles.seo}>

            <section className={Styles.header}>
                <div>
                    <p className={Styles.headerText}>Отслеживание позиций сайта</p>
                    <img src={Line} alt="line" className={Styles.line}/>
                </div>
            </section>

            <div style={{display:'flex', flexDirection:'row-reverse', justifyContent: 'flex-end', alignItems: 'center'}}>
                <section className={Styles.dataTable} style={{width: '770px', height:'400px'}}>
                    <p className={StylesCP.dataLi} style={{marginLeft:'20px'}}>
                        <p className={StylesCP.nameP}>Название:</p>
                        <p>{currentProject.name}</p>
                    </p>

                    <p className={StylesCP.dataLi} style={{marginLeft:'20px'}}>
                        <p className={StylesCP.nameP}>Описание:</p>
                        <p style={{width:'630px'}}>{currentProject.description}</p>
                    </p>

                    <p className={StylesCP.dataLi} style={{marginLeft:'20px'}}>
                        <p className={StylesCP.nameP}>Ссылка:</p>
                        <p>{currentProject.url}</p>
                    </p>
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
                            <input type="radio" value="yandex" checked ={value === 'yandex'} onChange={changeValueFirst}
                            onClick={()=>setFirstSearchSystem(firstSearchSystem)}/>
                        </p>

                        <p className={Styles.inputWarning}>
                            Google
                            <input type="radio" value="google" checked ={value === 'google'} onChange={changeValueSecond}
                            onClick={()=>setSecondSearchSystem(secondSearchSystem)}/>
                        </p>
                    </div>

                    {(validateSystem) && 
                    <p style={{fontSize:'12px', width:'500px', height:'20px', marginTop:'-10px', marginBottom:'0', color:'rgb(246, 100, 80)'}}>
                        Необходимо выбрать систему поиска! 
                    </p>}

                    <div>
                        <textarea className={Styles.textInputSeo} value={inputValue} 
                        onChange={e => setInputValue(e.target.value)} id="keyWords" 
                        placeholder='Пример: "новости, сенсация, город"'/>

                        {validateInputValue && 
                            <p style={{fontSize:'12px', width:'500px', height:'40px', marginBottom:'-40px', color:'rgb(246, 100, 80)'}}>
                                Количество запросов должно быть в диапазоне от 1 до 15! 
                            </p>
                        }
                    </div>
                    

                    <p className={Styles.inputWarning}>
                        Введите запросы - каждый запрос через запятую. Поиск осуществляется в топ-100. 
                    </p>

                    <div style={{display:'flex', flexDirection:'row', columnGap: '30px'}}>
                        <button
                            className={Styles.inputButton2}
                            disabled={inputValue.length === 0 && (!firstSearchSystem && !secondSearchSystem)}
                            type='button'
                            onClick={sendData}>
                            Отправить
                        </button>

                        <p style={{fontSize:'15px', color: '#757575'}}>
                            {inputValue==='' ? 0 : inputValue.trim().split(', ').length} / 15
                        </p>
                    </div>
                </div>
            </section>
            </div>

            

            { isLoading ? <div className={Styles.loading}><p>Loading...</p><img src={Loader} alt="loader"/></div> : 
                (usersReq?.length !== 0 && <section>
                <table className={Styles.tableSeo}>
                    <thead>
                        <tr>
                            <th className={Styles.nameColumn}><p style={{fontWeight:"600"}}>Поисковая система</p></th>
                            <th className={Styles.nameColumn}><p style={{fontWeight:"600"}}>Запрос</p></th>
                            <th className={Styles.nameColumn}><p style={{fontWeight:"600"}}>Позиция</p></th>
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