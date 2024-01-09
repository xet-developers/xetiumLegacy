import React, {useContext, useEffect, useState} from 'react';
import ProjectMenu from "../../components/UI/ProjectMenu";
import Tutorial from "../../components/Tutorial";
import Styles from "../../styles/currentProject.module.css";

import {CurrentProjectContext, UserProjectsContext} from "../../contex/CurrentProject";
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
                    <p>{currentProject.description}</p>
                </p>

                <p className={Styles.dataLi}>
                    <p className={Styles.nameP}>Ссылка:</p>
                    <p>{currentProject.url}</p>
                </p>
            </div>

        </div>
    );
};

export default CurrentProject;