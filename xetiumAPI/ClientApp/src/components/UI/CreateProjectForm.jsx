import React, {useState} from 'react';
import CreateProject from "./CreateProject";

const CreateProjectForm = ({modal, setModal, setProjects, projects}) => {
    const [projectName, setProjectName] = useState("")
    const [projectRef, setProjectRef] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    const [nameIsCorrect, setNameIsCorrect] = useState(true)

    const sendProjectData = (e) => {
        e.preventDefault()

        if(projects.some(project => project.name === projectName)){
            setNameIsCorrect(false)
            return
        }

        setNameIsCorrect(true)
        const newProject = {name: projectName,description: projectDescription, ref: projectRef, date: Date.now()}
        setProjects([...projects, newProject])
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