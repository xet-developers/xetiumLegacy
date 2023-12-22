import React, {useState, useEffect} from 'react';
import Styles from "../../styles/clastering.module.css";
import { ClasteringData } from './ClasteringData';

const ClasteringReport = () => {
    
    return (
        <div className={Styles.clastering}> 
            <section className={Styles.start}>
                <div className={Styles.input}>
                    <p>
                        Список запросов
                    </p>

                    <input/>

                    <p>
                        Введите запросы - каждый запрос с новой строки. 
                    </p>

                    <button>
                        Или прикрепите 
                        файл .txt
                    </button>

                    <button>
                        Отправить
                    </button>
                </div>

                <div className={Styles.warning}>
                    <img>

                    </img> 

                    <p>
                        После автоматической кластеризации рекомендуется 
                        проводить дополнительную ручную кластеризацию. 
                        Это помогает довести состояние кластеров до нужного
                        вам состояния и распределить не попавшие в кластеры 
                        запросы самостоятельно.
                    </p>     
                </div>
            </section>

            <section className={Styles.result}>
                <p>
                    Результат:
                </p>

                <ul>
                    <li>
                        <p>Кластеризация успешно завершена</p>
                        <button>Скачать</button>
                    </li>

                    <li>
                        <p>Общее количество запросов: </p>

                    </li>

                    <li>
                        <p>Количество кластеризованных запросов:</p>
                    </li>
                </ul>
            </section>

            <section className={Styles.allClaster}>
                <p>
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