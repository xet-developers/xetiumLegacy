import React, {useContext} from 'react';
import ProjectMenu from "../../components/UI/ProjectMenu";
import Tutorial from "../../components/Tutorial";
import Styles from "../../styles/currentProject.module.css";
import Styles1 from "../../styles/clastering.module.css";

import {CurrentProjectContext, UserProjectsContext} from "../../context/CurrentProject";
import {Requests} from "../../API/Requests";
import {LocalStorageManager} from "../../misc/LocalStorageManager";

const CurrentProject = () => {
    const {userProjects, setUserProjects} = useContext(UserProjectsContext)
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)

    if (!userProjects || userProjects.length === 0) {
        return (
            <Tutorial/>
        )
    }

    const deleteProject = () => {
        const API = new Requests()
        API.registeredDelete('project', currentProject.id)

        setUserProjects(userProjects.filter(item => {
            return item.id !== currentProject.id
        }))

        LocalStorageManager.setCurrentProject(userProjects[0])
        setCurrentProject(userProjects[0])
    }

    return (
        <div className={Styles.main}>
            <ProjectMenu/>
            <div className={Styles.data}>
                <p className={Styles.dataLi}>
                    <p className={Styles.nameP}>Название:</p>
                    <p>{currentProject.name}</p>
                </p>

                <p className={Styles.dataLi}>
                    <p className={Styles.nameP}>Описание:</p>
                    <p style={{width:'630px'}}>{currentProject.description}</p>
                </p>

                <p className={Styles.dataLi}>
                    <p className={Styles.nameP}>Ссылка:</p>
                    <p>{currentProject.url}</p>
                </p>
                <div style={{display: 'flex', justifyContent:'center'}}>
                    <button className={Styles1.inputButton2} onClick={deleteProject}>Удалить проект</button>
                </div>
            </div>
        </div>
    );
};

export default CurrentProject;