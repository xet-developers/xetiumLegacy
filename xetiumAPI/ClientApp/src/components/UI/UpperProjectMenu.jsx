import React, {useState} from 'react';
import Styles from "../../styles/navMenu.module.css";
import {Link} from "react-router-dom";

import acc from "../../images/icon-account.svg";
import proj from "../../images/icon-project.svg";
import arrow from "../../images/arrow.svg";
import arrowUp from "../../images/arrow top.svg";
import search from "../../images/icon-position.svg";
import claster from "../../images/icon-claster.svg";
import report from "../../images/icon-report.svg";
import MyProject from "./MyProject";

const UpperProjectMenu = ({projects, setModal}) => {
    const [isProjectsOpen, setIsProjectsOpen] = useState(false)

    const paths = [
        {link: '/personalaccount', description: "Личный кабинет", pict: acc},
        {
            link: '/', description: "Мои проекты", pict: proj, button: (<img className={Styles.arrow} src={
                isProjectsOpen
                    ? arrow
                    : arrowUp} onClick={() => setIsProjectsOpen(!isProjectsOpen)} alt={""}/>)
        },
        {link: '/siteposition', description: "Отслеживание позиций сайта", pict: search},
        {link: '/queryclustering', description: "Кластеризация запросов", pict: claster},
        {link: '/report', description: "Отчеты", pict: report},]

    return (
        <div className={Styles.upperMenu}>
            {paths.map((el) =>
                <div key={el.description}>
                    <div className={Styles.MyProject}>
                        <Link className={Styles.upperMenuItems} to={el.link}>
                            <img src={el.pict} alt={"эл"} height="25px"/>
                            <p className={Styles.upperMenuItemsText}>{el.description}</p>
                        </Link>
                        {el.button}
                    </div>

                    {isProjectsOpen && el.button &&
                        <MyProject projects={projects} setModal={setModal} />
                    }
                </div>)
            }
        </div>
    );
};

export default UpperProjectMenu;