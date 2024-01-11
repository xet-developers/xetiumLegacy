import React from 'react';
import Styles from "../../styles/advertisingBody.module.css";
import iconAnalysis from "../../images/iconAnalysis.svg";
import iconReport from "../../images/iconReport.svg";
import iconClaster from "../../images/iconClaster.svg";
import {Link} from "react-router-dom";
import UIButton from "../UI/UIButton";

const content = [
    {
        img: iconAnalysis,
        alt: "iconAnalysis",
        header: "Проверка и анализ позиций сайта",
        description: "Проверка позиции вашего сайта в поисковых системах по желаемому набору запросов.\n" +
            "Получайте не только результаты,  но и изменения в позициях для наблюдения за\n" +
            "динамикой продвижения проекта в интернете."
    },
    {
        img: iconReport,
        alt: "iconReport",
        header: "Кластеризация запросов",
        description: "Есть возможность составить кластеры запросов для формирования полноценного\n" +
            "семантического ядра. Выделяйте ключевые слова, а Xetium подготовит для вас\n" +
            "полноценный список всех возможных запросов."
    },
    {
        img: iconClaster,
        alt: "iconClaster",
        header: "Формирование отчетов",
        description: "Результаты проведенных проверок позиций сайта предоставляются в формате XLS.\n" +
            "Запрашивайте отчеты за определенный промежуток времени, формируйте их заново\n" +
            "при утере – Xetium надежно сохранит все данные для полноценной картины SEO-продвижения."
    },
]

const SecondPart = () => {
    return (
        <section className={Styles.body} id="function">
            <div>
                <h2 className={Styles.advertisingH2}>
                    Какие <span style={{color: '#F66450'}}>инструменты</span><br/>мы предлагаем?
                </h2>

                <div className={Styles.columns}>
                    {content.map(el=>
                        <div key={el.header} className={Styles.columnItem}>
                            <img src={el.img} alt={el.alt} className={Styles.iconFunction}/>
                            <h3 className={Styles.advertisingH3}>{el.header}</h3>
                            <p className={Styles.description}>
                                {el.description}
                            </p>
                        </div>
                    )}
                </div>

                <Link to="/register">
                    <UIButton className={Styles.buttonFreeSectionTwo}>
                        <span className={Styles.nameButtonFreeTwo}>Попробовать бесплатно</span>
                    </UIButton>
                </Link>
            </div>
        </section>
    );
};

export default SecondPart;