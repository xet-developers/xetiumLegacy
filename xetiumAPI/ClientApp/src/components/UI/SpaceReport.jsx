import React, {useState, useEffect} from 'react';
import Styles from "../../styles/report.module.css";
import { ReportData } from './ReportData';

const SpaceReport = () => {
    
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
                            <input type="date"></input>
                        </p>

                        <p className={Styles.date}>
                            <p>Дата конца интервала:</p>
                            <input type="date"></input>
                        </p>
                    </div>
                </div>

                <button className={Styles.button1}>
                    Сгенерировать отчёт
                </button>

                <div className={Styles.downloadOne}>
                    <p>Скачать отчёт можно по ссылке ниже:</p>
                    <button className={Styles.button2}>
                        <a href='https://drive.google.com/uc?export=download&id=1hZpaPHKPoiTOR1iZDefWitbBkBOKbomu'>
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