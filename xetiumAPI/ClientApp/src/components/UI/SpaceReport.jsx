import React, {useState} from 'react';
import Styles from "../../styles/report.module.css";
import {ReportData} from './ReportData';
import Line from "../../images/line.svg";
import {Requests} from "../../API/Requests";
import Loader from "../../images/loader.gif";

const SpaceReport = () => {
    const [startData, setStartData] = useState('')
    const [endData, setEndData] = useState('')
    const [isLoading, setLoading] = useState(false)

    const sendData = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3500);
        const startDataToSend = startData + 'T00:00:00.00Z';
        const endDataToSend = endData + 'T00:00:00.00Z';

        const res = {
            FirstDate: startDataToSend,
            LastDate: endDataToSend
        }

        const API = new Requests()
        API.registeredPost('report', res).then(res => res.blob())
            .then(blob => {
                const link = document.createElement('a')

                link.setAttribute('href', URL.createObjectURL(blob))
                link.setAttribute('download', 'report.xlsx')

                console.log(link)
                link.click()
            })
            .then(() => setLoading(false))
    }

    return (
        <div className={Styles.report}>
            <section className={Styles.header}>
                <div>
                    <p className={Styles.headerText}>Отчёты</p>
                    <img src={Line} alt="line" className={Styles.line}/>
                </div>
            </section>

            <section className={Styles.data}>
                <div className={Styles.template}>
                    <p>
                        Выберите шаблон отчёта:
                    </p>

                    <select className={Styles.choosen}>
                        <option>Динамика позиций сайта за интервал времени</option>
                        <option disabled>Новые форматы отчетов в разработке</option>
                    </select>
                </div>

                <div>
                    <p className={Styles.date}>
                        <p>Начало интервала:</p>
                        <input onChange={e => setStartData(e.target.value)} type="date"
                               className={Styles.choosen}></input>
                    </p>

                    <p className={Styles.date}>
                        <p>Конец интервала:</p>
                        <input onChange={e => setEndData(e.target.value)} type="date"
                               className={Styles.choosen}></input>
                    </p>
                </div>

                <div className={Styles.generate}>
                    <button onClick={sendData} className={Styles.buttonDownloadReport1}>
                        {isLoading ?
                            <div>
                                <p className={Styles.loading}>Loading...</p>
                                <img src={Loader} alt="loader" className={Styles.loader}/></div> :
                            <a id='download' className={Styles.generateReport}>
                                Сгенерировать отчёт
                            </a>}
                    </button>
                </div>
            </section>

            {false && <section>
                <p>
                    Все отчёты находятся в таблице ниже:
                </p>
                <table className={Styles.tableReport}>
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Тип отчёта</th>
                        <th>Интервал</th>
                        <th>Ссылка для скачивания</th>
                    </tr>
                    </thead>

                    <tbody>
                    <ReportData/>
                    </tbody>
                </table>
            </section>}
        </div>
    );
};

export default SpaceReport;