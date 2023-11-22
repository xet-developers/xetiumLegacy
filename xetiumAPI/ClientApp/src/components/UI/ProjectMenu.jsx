import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Styles from "../../styles/navMenu.module.css"

import logo from "../../images/logo.svg";
import claster from "../../images/icon-claster.svg";
import acc from "../../images/icon-account.svg";
import report from "../../images/icon-report.svg";
import proj from "../../images/icon-project.svg";
import search from "../../images/icon-position.svg";
import arrow from "../../images/arrow.svg";
import arrowUp from "../../images/arrow top.svg";
import dot from "../../images/Ellipse.svg"
import plus from "../../images/icon-plus.svg"
import CreateProject from "./CreateProject";


const ProjectMenu = () => {
    const [isProjectsOpen, setIsProjectsOpen] = useState(false)
    const [projects, setProjects] = useState([
        {name: "Имя проекта 1"},
        {name: "Имя проекта 2"},
        {name: "Имя проекта 3"}
    ])
    const [modal, setModal] = useState(false);

    const createProject = (project) => {
        setProjects([...projects, project])
    }

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


    const [projectName, setProjectName] = useState("")
    const [projectRef, setProjectRef] = useState("")
    const [projectDescription, setProjectDescription] = useState("")

    const sendProjectData = (e) => {
        e.preventDefault()
        setProjects([...projects, {name: projectName,description: projectDescription, ref: projectRef}])
        setModal(false)
    }

    return (
        <nav className={Styles.menuWithLogo}>
            <img src={logo} alt="Logo" width="180px" height="50px"/>
            <div className={Styles.menu}>
                <div className={Styles.upperMenu}>
                    {paths.map((el) =>
                        <div>
                            <div className={Styles.MyProject}>
                                <Link className={Styles.upperMenuItems} to={el.link}>
                                    <img src={el.pict} alt={"пум"} height="25px"/>
                                    <p className={Styles.upperMenuItemsText}>{el.description}</p>
                                </Link>
                                {el.button}
                            </div>

                            {isProjectsOpen && el.button &&
                                <div>
                                    <div className={Styles.empty}/>
                                    <ul className={Styles.list}>
                                        {projects.map(project =>
                                            <li className={Styles.listItem}>
                                                <img src={dot} alt={""}/>
                                                <Link to={project.name}>
                                                    <span>{project.name}</span>
                                                </Link>
                                            </li>)}

                                        <li className={Styles.AddProject}>
                                            <img src={plus} alt={""}/>
                                            <span onClick={() => {
                                                setModal(true)
                                            }}>Добавить проект</span>
                                        </li>
                                    </ul>
                                </div>}
                        </div>)
                    }
                </div>

                <div className={Styles.lowerMenu}>
                    <Link to={"/support"}>Поддержка</Link>
                    <Link to={"/confpolitic"}>Политика конфиденциальности</Link>
                </div>
            </div>

            <CreateProject visible={modal} setVisible={setModal}>
                <form>
                    <input placeholder="Название проекта" type="text" onChange={event => setProjectName(event.target.value)}
                           required/>

                    <input placeholder="ссылка" type="text" onChange=
                        {event => setProjectRef(event.target.value)} required/>

                    <input  placeholder="Описание" onChange={event => setProjectDescription(event.target.value)}
                            required/>

                    <button onClick={sendProjectData}>dasdada</button>
                </form>
            </CreateProject>
        </nav>
    );
};

export default ProjectMenu;