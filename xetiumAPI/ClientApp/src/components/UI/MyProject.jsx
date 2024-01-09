import React, {useContext, useEffect, useState} from 'react';
import Styles from "../../styles/navMenu.module.css";
import dot from "../../images/Ellipse.svg";
import {Link} from "react-router-dom";
import plus from "../../images/icon-plus.svg";
import {CurrentProjectContext, UserProjectsContext} from "../../contex/CurrentProject";
import {LocalStorageManager} from "../../misc/LocalStorageManager";

const MyProject = ({setModal}) => {
    const {userProjects, setUserProjects} = useContext(UserProjectsContext)
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        setProjects(userProjects.filter(item => {
            return item.id !== currentProject.id
        }))
    }, []);

    return (
        <div>
            <div className={Styles.empty}/>
            <ul className={Styles.list}>
                {projects.map(project =>
                    <li key={project.id} className={Styles.listItem}>
                        <img src={dot} alt={""}/>
                        <Link style={{color:'white'}}>
                            <span onClick = {() => {
                                LocalStorageManager.setCurrentProject(project)
                                setCurrentProject(project)
                            }}>{project.name}</span>
                        </Link>
                    </li>)}

                <li className={Styles.AddProject}>
                    <img src={plus} alt={""}/>
                    <span onClick={() => {
                        setModal(true)
                    }}>Добавить проект</span>
                </li>
            </ul>
        </div>
    );
};

export default MyProject;