import React, {useState} from 'react';
import Styles from "../../styles/searchPosition.module.css";
import Arrow from "../../images/arrowSeo.svg";
import Line from "../../images/line.svg";
import axios from "https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js";

const SpaceSEO = () => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div>
            <section className={Styles.header}>
                <div>
                    <img src= {Arrow} alt = "arrow" className={Styles.arrow}/>
                    <p className={Styles.headerText}>Проверка позиций</p>
                    <img src= {Line} alt = "line" className={Styles.line}/>
                </div>
            </section>

            <section>
                <div>
                    <p className={Styles.h}>Добавление ключевых слов</p>

                    <input value={inputValue} onChange = {e => setInputValue(e.target.value)} id="keyWords"/>
                    <br/>
                    <label for="keyWords">Вводите запросы через запятую! До и после запятой не ставьте пробел.</label>
                    <br/>
                    <button 
                        className={Styles.sendKey}
                        disabled={inputValue.length === 0}
                        type='button'
                        onClick={async () => {
                            try {
                                const keyWordsArray = inputValue.trim().split(',');
                                console.log(keyWordsArray);
                                await axios({
                                    url: "siteposition",
                                    headers: {
                                        'Content-Type': "application/problem+json; charset=utf-8"
                                    },
                                    params: {
                                        field: keyWordsArray
                                    },
                                    method: "POST",
                                    data: null
                                }).then(({ data }) => {
                                    return data;
                                });
                            } catch (error) {
                                console.log(error);
                            }
                        }}>
                        Отправить
                    </button>

                
                </div>
            </section>
        </div>
    );
};

export default SpaceSEO;