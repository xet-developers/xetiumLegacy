import React, {useContext, useState} from 'react';
import CreateProject from "./CreateProject";
import {CurrentProjectContext, UserProjectsContext} from "../../contex/CurrentProject";

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
            res.date =  Date.now();
            const newProject = res;
            setCurrentProject(newProject)
            setUserProjects([...userProjects, newProject])
            localStorage.setItem("UserProjects", userProjects)
            setModal(false)
        }
    }

    return (
        <CreateProject visible={modal} setVisible={setModal}>
            <form>
                <input placeholder="Название проекта" type="text" onChange={event => setProjectName(event.target.value)}
                       required/>

                <input placeholder="Cсылка" type="text" onChange=
                    {event => setUrl(event.target.value)} required/>

                <input placeholder="Описание" onChange={event => setProjectDescription(event.target.value)}
                       required/>

                {!nameIsCorrect && <p>Не корректное имя</p>}

                <button onClick={sendProjectData}>Создать</button>
            </form>
        </CreateProject>
    );
};

export default CreateProjectForm;