import React, {useState, useEffect} from 'react';
import Styles from "../../styles/clastering.module.css";
import { ClasteringData } from './ClasteringData';
import Line from "../../images/line.svg";
import Warning from "../../images/warning.png";

const ClasteringReport = () => {
    
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

                    <textarea/>

                    <p className={Styles.inputWarning}>
                        Введите запросы - каждый запрос с новой строки. 
                    </p>

                    <button className={Styles.inputButton1}>
                        Прикрепить файл
                    </button>

                    <button className={Styles.inputButton2}>
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

            <section className={Styles.result}>
                <p className={Styles.Head}>
                    Результат:
                </p>
                
                <div>
                    <p>Кластеризация успешно завершена</p>
                    <button>Скачать</button>
                </div>
                

                <p>Общее количество запросов: </p>

                <p>Количество кластеризованных запросов:</p>
                
            </section>

            <section className={Styles.allClaster}>
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
            </section>
        </div>
    );
};

export default ClasteringReport;