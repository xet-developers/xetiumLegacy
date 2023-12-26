import React, {useContext, useState} from 'react';
import CreateProject from "./CreateProject";
import {CurrentProjectContext, UserProjectsContext} from "../../contex/CurrentProject";
import Styles from "../../styles/CreateProject.module.css";

const CreateProjectForm = ({modal, setModal}) => {
    const [projectName, setProjectName] = useState("")
    const [url, setUrl] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [nameIsCorrect, setNameIsCorrect] = useState(true)
    const {userProjects, setUserProjects} = useContext(UserProjectsContext)
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)

    const sendProjectData = async (e) => {
        e.preventDefault()

        if (userProjects.some(project => project.name === projectName)) {
            setNameIsCorrect(false)
            return
        }

        const res = {
            name: projectName,
            url: url,
            description: projectDescription
        }

        const params = {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("jwt"),
                'Content-Type': "application/problem+json; charset=utf-8"
            },
            body: JSON.stringify(res)
        };

        const resp = await fetch("/project/create", params)

        if(resp.ok) {
            setNameIsCorrect(true)
            const newProject = res;
            const a = await resp.json()
            newProject.id = a.id;
            setCurrentProject(newProject)
            setUserProjects([...userProjects, newProject])
            setModal(false)
        }
    }

    return (
        <CreateProject visible={modal} setVisible={setModal}>
            <form className={Styles.formCreate}>
                <p className={Styles.header}>
                    Мой проект
                </p>

                <input placeholder="Введите название проекта" type="text" onChange={event => setProjectName(event.target.value)}
                    required/>

                <input placeholder="Вставьте ссылку на ваш сайт" type="text" onChange=
                    {event => setUrl(event.target.value)} required/>

                <input placeholder="Заполните описание проекта" onChange={event => setProjectDescription(event.target.value)}
                    required/>

                {!nameIsCorrect && <p>Не корректное имя</p>}

                <button onClick={sendProjectData} className={Styles.buttonCreate}>Создать</button>
            </form>
        </CreateProject>
    );
};

export default CreateProjectForm;