import React, {useContext, useState} from 'react';
import CreateProject from "./CreateProject";
import {CurrentProjectContext, UserProjectsContext} from "../../contex/CurrentProject";
import Styles from "../../styles/CreateProject.module.css";
import {Requests} from "../../API/Requests";
import {LocalStorageManager} from "../../misc/LocalStorageManager";

const CreateProjectForm = ({modal, setModal}) => {
    const [projectName, setProjectName] = useState("")
    const [url, setUrl] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [nameIsCorrect, setNameIsCorrect] = useState(true)
    const {userProjects, setUserProjects} = useContext(UserProjectsContext)
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)

    const sendProjectData = async (e) => {
        e.preventDefault()

        if (userProjects?.some(project => project.name === projectName)) {
            setNameIsCorrect(false)
            return
        }

        const res = {
            name: projectName,
            url: url,
            description: projectDescription
        }

        const API = new Requests()
        API.registeredPost('/project/create', res)
            .then(res => res.json())
            .then(resp => {
            setNameIsCorrect(true)
            const newProject = res;
            newProject.id = resp.id;
            LocalStorageManager.setCurrentProject(newProject)
            setCurrentProject(newProject)
            LocalStorageManager.setUserProjects([...userProjects, newProject])
            setUserProjects([...userProjects, newProject])
            setModal(false)
        })
    }

    return (
        <CreateProject visible={modal} setVisible={setModal}>
            <form className={Styles.formCreate}>
                <p className={Styles.header}>
                    Создание проекта
                </p>

                <div className={Styles.create}>
                    <input placeholder="Название проекта" type="text" required
                           onChange={event => setProjectName(event.target.value)}
                           className={Styles.nameProject}/>

                    <input placeholder="Ссылка на сайт: HTTPS://EXAMPLE.COM/" type="url" required
                           onChange={event => setUrl(event.target.value)}
                           className={Styles.urlProject}/>

                    <textarea placeholder="Описание проекта" required
                              onChange={event => setProjectDescription(event.target.value)}
                              className={Styles.descProject}/>
                </div>

                {!nameIsCorrect && <p>Не корректное имя</p>}

                <button onClick={sendProjectData} className={Styles.buttonCreate}>СОЗДАТЬ</button>
            </form>
        </CreateProject>
    );
};

export default CreateProjectForm;