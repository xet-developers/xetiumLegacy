import React from 'react';
import {Link} from "react-router-dom";
import Styles from '../styles/advertisingBody.module.css';
import UIButton from "./UI/UIButton";
import emptyImage from '../images/background-head.png';
import iconAnalysis from '../images/iconAnalysis.svg';
import iconClaster from '../images/iconClaster.svg';
import iconReport from '../images/iconReport.svg';
import arrow from '../images/Arrow 1.svg';

const AdvertisingBody = () => {
    return (
        <div>
            <section className={Styles.body}>
                <div>
                    <p className={Styles.nameService}>Xetium</p>
                    <h1 className={Styles.advertisingH1}>
                        <span>Лучший помощник</span>
                        <br></br>
                        <span style = {{color: '#F66450'}}>в SEO-продвижении</span>
                        <br></br>
                        <span>вашего проекта</span>
                    </h1>
                    <br></br>
                    <p className={Styles.advertisingDescription}>
                        Проверка позиции сайта в поисковых системах,<br></br>
                        составление семантического ядра для сервиса и<br></br>
                        впоследствии еще больше удобных инструментов<br></br>
                        в развивающемся проекте.
                    </p>
                    <Link to="/register">
                        <UIButton className={Styles.buttonFree}>
                            <span className={Styles.nameButtonFree}>Попробовать бесплатно</span>
                        </UIButton>
                    </Link>
                </div>
                <img src= {emptyImage} alt = "emptyAboba" className={Styles.advertisingPhoto}/>
            </section>
            
            <section className={Styles.body}>
                <div>
                <p className={Styles.advertisingH2}>Какие&nbsp;<span style = {{color: '#F66450'}}>инструменты</span>&nbsp;мы предлагаем?</p>
                <div className = {Styles.columns}>
                    <div className = {Styles.columnItem}>
                        <img src= {iconAnalysis} alt = "iconAnalysis" className={Styles.iconFunction}/>
                        <h3 className={Styles.advertisingH3}>Проверка и анализ <br></br>позиций сайта</h3>
                        
                        <p className={Styles.description}>
                            Проверка позиции вашего сайта в поисковых системах по желаемому набору запросов. 
                            Получайте не только результаты,  но и изменения в позициях для наблюдения за 
                            динамикой продвижения проекта в интернете.
                        </p>
                    </div>

                    <div className = {Styles.columnItem}>
                        <img src= {iconReport} alt = "iconReport" className={Styles.iconFunction}/>
                        <h3 className={Styles.advertisingH3}>Кластеризация запросов</h3>
                        
                        <p className={Styles.description}>
                            Есть возможность составить кластеры запросов для формирования полноценного 
                            семантического ядра. Выделяйте ключевые слова, а Xetium подготовит для вас 
                            полноценный список всех возможных запросов.
                        </p>
                    </div>

                    <div className = {Styles.columnItem}>
                        <img src= {iconClaster} alt = "iconClaster" className={Styles.iconFunction}/>
                        <h3 className={Styles.advertisingH3}>Формирование отчетов</h3>
                        
                        <p className={Styles.description}>
                        Результаты проведенных проверок позиций сайта предоставляются в формате XLS. 
                        Запрашивайте отчеты за определенный промежуток времени, формируйте их заново 
                        при утере – Xetium надежно сохранит все данные для полноценной картины SEO-продвижения.
                        </p>
                    </div>
                </div>
                <Link to="/register">
                        <UIButton className={Styles.buttonFreeSectionTwo}>
                            <span className={Styles.nameButtonFreeTwo}>Попробовать бесплатно</span>
                        </UIButton>
                </Link>
                </div>
            </section>

            <section>
                <div>
                    <p className={Styles.textSectionThree}>
                        <span style = {{color: '#F66450'}}>Xetium</span> постоянно развивается <br></br>и расширяет свои возможности ради вас
                    </p>
                    
                    <Link to="/register">
                        <UIButton className={Styles.buttonProject}>
                            <span className={Styles.buttonTextProject}>Перейти к проектам</span>
                            <img src= {arrow} alt = "arrow" className={Styles.arrow}/>
                        </UIButton>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AdvertisingBody;