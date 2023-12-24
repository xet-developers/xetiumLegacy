import React, {useContext, useState} from 'react';
import ProjectMenu from "../../components/UI/ProjectMenu";
import Tutorial from "../../components/Tutorial";
import {CurrentProjectContext, UserProjectsContext} from "../../contex/CurrentProject";

const CurrentProject = () => {
    const {userProjects, setProjects} = useContext(UserProjectsContext)
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)
    const [modal, setModal] = useState(false);

    if (userProjects.length === 0) {
        return (
            <Tutorial modal={modal} setModal={setModal}/>
        )
    }

    const date = new Date(currentProject.date)

    return (
        <div>
            <ProjectMenu modal={modal} setModal={setModal}/>
            <p>Название: {currentProject.name}</p>
            <p>Описание: {currentProject.description}</p>
            <p>Ссылка: {currentProject.url}</p>
            <p>Дата добавления: {date.getDate()} {date.getMonth() + 1} {date.getFullYear()}</p>
        </div>
    );
};

export default CurrentProject;