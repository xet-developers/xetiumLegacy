import React, {useState} from 'react';
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";
import Styles from "../../styles/navMenu.module.css"

import claster from "../../images/icon-claster.svg";
import acc from "../../images/icon-account.svg";
import report from "../../images/icon-report.svg";
import proj from "../../images/icon-project.svg";
import search from "../../images/icon-position.svg";
import arrow from "../../images/arrow.svg";
import arrowUp from "../../images/arrow top.svg";


const ProjectMenu = () => {
        const paths = [
            {link: '/siteposition', description: "Отслеживание позиций сайта", pict: search},
            {link: '/queryclustering', description: "Кластеризация запросов", pict: claster},
            {link: '/report', description: "Отчеты", pict: report},]

        const [isProjectsOpen, setIsProjectsOpen] = useState(false)


        const project = [
            {name: "Имя проекта 1"},
            {name: "Имя проекта 2"},
            {name: "Имя проекта 3"}
        ]// получать с бека

        return (
            <nav className={Styles.menu}>
                <img src={logo} alt="Logo" width="180px" height="50px"/>
                <div className={Styles.upperMenu}>
                    <Link className={Styles.upperMenuItems} to={"/" + ""}>
                        <img src={acc} alt={"пум"} height="25px"/>
                        <p className={Styles.upperMenuItemsText}>Личный кабинет</p>
                    </Link>

                    <div className={Styles.MyProject} id="piu">
                        <Link className={Styles.upperMenuItems} to="/">
                            <img src={proj} alt={"пум"} height="25px"/>
                            <p className={Styles.upperMenuItemsText}>Мои проекты</p>
                        </Link>

                        <img className={Styles.arrow} src={
                            isProjectsOpen
                                ? arrow
                                : arrowUp
                        }
                             onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                             alt={""}/>

                    </div>

                    {isProjectsOpen &&
                        <ul className={Styles.list}>
                            {project.map(project =>
                                <li className={Styles.listItem}><Link to={project.name}>{project.name}</Link></li>)}
                            <li className={Styles.AddProject}>Добавить проект</li>
                        </ul>
                        }

                    {paths.map(el =>
                        <Link className={Styles.upperMenuItems} to={el.link}>
                            <img src={el.pict} alt={"пум"} height="25px"/>
                            <p className={Styles.upperMenuItemsText}>{el.description}</p>
                        </Link>)}
                </div>
            </nav>
        );
    }
;

export default ProjectMenu;