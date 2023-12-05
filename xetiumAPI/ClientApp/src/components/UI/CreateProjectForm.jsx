import React, {useContext, useState} from 'react';
import CreateProject from "./CreateProject";
import {UserProjectsContext} from "../../contex/CurrentProject";

const CreateProjectForm = ({modal, setModal}) => {
    const [projectName, setProjectName] = useState("")
    const [projectRef, setProjectRef] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [nameIsCorrect, setNameIsCorrect] = useState(true)
    const {userProjects, setUserProjects} = useContext(UserProjectsContext)

    const sendProjectData = (e) => {
        e.preventDefault()

        if(userProjects.some(project => project.name === projectName)){
            setNameIsCorrect(false)
            return
        }

        setNameIsCorrect(true)
        const newProject = {name: projectName,description: projectDescription, ref: projectRef, date: Date.now()}
        setUserProjects([...userProjects, newProject])
        setModal(false)
    }

    return (
        <CreateProject visible={modal} setVisible={setModal}>
            <form>
                <input placeholder="Название проекта" type="text" onChange={event => setProjectName(event.target.value)}
                       required/>

                <input placeholder="Cсылка" type="text" onChange=
                    {event => setProjectRef(event.target.value)} required/>

                <input  placeholder="Описание" onChange={event => setProjectDescription(event.target.value)}
                        required/>

                {!nameIsCorrect&&<p>Не корректное имя</p>}

                <button onClick={sendProjectData}>dasdada</button>
            </form>
        </CreateProject>
    );
};

export default CreateProjectForm;