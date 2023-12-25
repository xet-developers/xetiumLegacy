import React, {useState} from 'react';
import Styles from "../../styles/report.module.css";
import {ReportData} from './ReportData';

const SpaceReport = () => {
    const [startData, setStartData] = useState('')
    const [endData, setEndData] = useState('')
    const [ligkgkg, setLigkgkg] = useState('')

    const sendData = async () => {
        const startDataToSend = startData + 'T00:00:00.00Z';
        const endDataToSend = endData + 'T00:00:00.00Z';

        const res = {
            FirstDate: startDataToSend,
            LastDate: endDataToSend
        }

        const params = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
                'Content-Type': "application/problem+json; charset=utf-8"
            },
            body: JSON.stringify(res)
        };

        const response = await fetch('report', params).then(res=> res.blob())

        setLigkgkg(URL.createObjectURL(await response))
        console.log(URL.createObjectURL(await response))
        console.log(ligkgkg)
    }

    return (
        <div className={Styles.report}>
            <section className={Styles.formGeneration}>

                <div className={Styles.data}>
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
                </div>

                <button onClick={sendData} className={Styles.button1}>
                    Сгенерировать отчёт
                </button>

                <div className={Styles.downloadOne}>
                    <p>Скачать отчёт можно по ссылке ниже:</p>
                    <button className={Styles.button2}>
                        <a download='report.xlsx' href={ligkgkg}>
                            Скачать
                        </a>
                    </button>
                </div>
            </section>

            <section>
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
            </section>
        </div>
    );
};

export default SpaceReport;