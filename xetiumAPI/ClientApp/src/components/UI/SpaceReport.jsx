import React, {useState} from 'react';
import Styles from "../../styles/report.module.css";
import {ReportData} from './ReportData';
import Line from "../../images/line.svg";
import {Requests} from "../../API/Requests";

const SpaceReport = () => {
    const [startData, setStartData] = useState('')
    const [endData, setEndData] = useState('')
    const [downloadLink, setDownloadLink] = useState('')

    const sendData = async () => {
        const startDataToSend = startData + 'T00:00:00.00Z';
        const endDataToSend = endData + 'T00:00:00.00Z';

        const res = {
            FirstDate: startDataToSend,
            LastDate: endDataToSend
        }

        const API = new Requests()
        API.registeredPost('report', res).then(res => res.blob())
            .then(blob => setDownloadLink(URL.createObjectURL(blob)))
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

                    <select>
                        <option>Динамика позиций сайта за интервал времени</option>
                        <option disabled>Другое</option>
                    </select>
                </div>

                <div>
                    <p className={Styles.date}>
                        <p>Дата начала интервала:</p>
                        <input onChange={e => setStartData(e.target.value)} type="date"></input>
                    </p>

                    <p className={Styles.date}>
                        <p>Дата конца интервала:</p>
                        <input onChange={e => setEndData(e.target.value)} type="date"></input>
                    </p>
                </div>

                <div className={Styles.generate}>

                    <button onClick={sendData} className={Styles.buttonDownloadReport1}>
                        Сгенерировать отчёт
                    </button>

                    <button className={Styles.buttonDownloadReport2}>
                        <a download='report.xlsx' href={downloadLink}>
                            Скачать
                        </a>
                    </button>
                </div>
            </section>

            {false&&<section>
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