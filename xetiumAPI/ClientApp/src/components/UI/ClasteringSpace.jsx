import React, {useState, useEffect} from 'react';
import Styles from "../../styles/clastering.module.css";
import { ClasteringData } from './ClasteringData';
import Line from "../../images/line.svg";
import Warning from "../../images/warning.png";
import {Requests} from "../../API/Requests";
import Loader from "../../images/loader.gif";

const ClasteringReport = () => {
    const [keywords, setKeywords] = useState('')
    const [downloadLink, setDownloadLink] = useState('')
    const [view, setView] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const sendData = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3500);
        const res = {
            query: keywords
        }

        const API = new Requests()
        API.registeredPost('clustering', res)
            .then(res => {
            setView(true);
            return res.blob();
            })
            .then(blob => setDownloadLink(URL.createObjectURL(blob)))
            .then(() => setLoading(false))
    }

    return (
        <div className={Styles.clastering}>
            <section className={Styles.header}>
                <div>
                    <p className={Styles.headerText}>Кластеризация запросов</p>
                    <img src={Line} alt="line" className={Styles.line}/>
                </div>
            </section>

            <section className={Styles.start}>
                <div className={Styles.input}>
                    <p className={Styles.Head}>
                        Список запросов
                    </p>

                    <textarea className={Styles.textInputClaster} onChange={e=>setKeywords(e.target.value)}/>

                    <p className={Styles.inputWarning}>
                        Введите запросы - каждый запрос через запятую. 
                    </p>

                    <button className={Styles.inputButton1} disabled>
                        Прикрепить файл
                    </button>

                    <button onClick={sendData} className={Styles.inputButton2}>
                        Отправить
                    </button>
                </div>

                <div className={Styles.warning}>
                    <img src={Warning} alt="warning" className={Styles.warningSvg}/> 

                    <p className={Styles.warningText}>
                        После автоматической кластеризации рекомендуется 
                        проводить дополнительную ручную кластеризацию. 
                        Это помогает довести состояние кластеров до нужного
                        вам состояния и распределить не попавшие в кластеры 
                        запросы самостоятельно.
                    </p>     
                </div>
            </section>

            {isLoading ? <div className={Styles.loading}><p>Loading...</p><img src={Loader} alt="loader"/></div> : (view&&<section className={Styles.result}>
                <div className={Styles.resultText}>
                    <p className={Styles.Head}>
                        Результат работы
                    </p>

                    <p>
                        Результат кластеризации сделан с помощью нейросети и может содержать ошибки. 
                    </p>

                    <div className={Styles.resultButton}>
                        <p>
                            Скачать можно по ссылке: 
                        </p>
                        <button className={Styles.buttonDownloadClaster}><a download='clustering.txt' href={downloadLink} style={{color:'white'}}>Скачать</a></button>
                    </div>
                </div>
            </section>)}

            {false&&<section className={Styles.allClaster}>
                <p className={Styles.Head}>
                    Последние кластеризации
                </p>

                <table className={Styles.tableClaster}>
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Количество запросов</th>
                            <th>Кол-во кластеризованных запросов</th>
                            <th>Ссылка для скачивания</th>
                        </tr>
                    </thead>

                    <tbody>
                        <ClasteringData/>
                    </tbody>
                </table>
            </section>}
        </div>
    );
};

export default ClasteringReport;