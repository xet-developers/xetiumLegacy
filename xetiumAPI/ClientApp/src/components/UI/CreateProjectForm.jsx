import React, {useContext, useState} from 'react';
import CreateProject from "./CreateProject";
import {CurrentProjectContext, UserProjectsContext} from "../../context/CurrentProject";
import Styles from "../../styles/CreateProject.module.css";
import {Requests} from "../../API/Requests";
import {LocalStorageManager} from "../../misc/LocalStorageManager";
import { Validator } from '../../misc/Validator.js';


const CreateProjectForm = ({modal, setModal}) => {
    const [projectName, setProjectName] = useState("")
    const [url, setUrl] = useState("")
    const [projectDescription, setProjectDescription] = useState("")
    
    const [validateNameProject, setValidateNameProject] = useState(false)
    const [validateUrlProject, setValidateUrlProject] = useState(false)
    const [validateDescProject, setValidateDescProject] = useState(false)

    const {userProjects, setUserProjects} = useContext(UserProjectsContext)
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)
    const validator = new Validator()

    const sendProjectData = async (e) => {
        e.preventDefault()

        if (validate()) {
            let desc = '[Информация о проекте отсутствует]'
            if (projectDescription.length !== 0) desc = projectDescription
            if (projectDescription.length > 95) {
                desc = projectDescription.match(/(.|\s){1,75}/g).join("\n")
            }

            const res = {
            name: projectName,
            url: url,
            description: desc
            }

            const API = new Requests()
            API.registeredPost('/project/create', res)
                .then(res => res.json())
                .then(resp => {
                const newProject = res;
                newProject.id = resp.id;
                LocalStorageManager.setCurrentProject(newProject)
                setCurrentProject(newProject)
                LocalStorageManager.setUserProjects([...userProjects, newProject])
                setUserProjects([...userProjects, newProject])
                setModal(false)
            })
        }

        
    }

    return (
        <CreateProject visible={modal} setVisible={setModal}>
            <form className={Styles.formCreate}>
                <p className={Styles.header}>
                    Создание проекта
                </p>

                <div className={Styles.create}>
                    <div>
                        <input placeholder="Название проекта (максимум 30 символов)" type="text" required
                           onChange={event => setProjectName(event.target.value)}
                           className={Styles.nameProject}/>

                        {validateNameProject && 
                        <p style={{fontSize:'12px', width:'500px', height:'40px', marginBottom:'-40px', color:'rgb(246, 100, 80)'}}>
                            Название проекта должно начинаться с буквы и иметь длину от 1 до 30 символов!
                        </p>}
                    </div>
                    
                    <div>
                        <input placeholder="Ссылка на сайт: HTTPS://EXAMPLE.COM/" type="url" required
                           onChange={event => setUrl(event.target.value)}
                           className={Styles.urlProject}/>
                           
                        {validateUrlProject && 
                        <p style={{fontSize:'12px', width:'500px', height:'40px', marginBottom:'-40px', color:'rgb(246, 100, 80)'}}>
                            Некорректные данные. Введите ссылку по примеру: HTTPS://EXAMPLE.COM/
                        </p>}
                    </div>
                    
                    <div>
                        <textarea placeholder="Описание проекта (максимум 150 символов)" required
                              onChange={event => { setProjectDescription(event.target.value)}}
                              className={Styles.descProject}/>

                        {validateDescProject && 
                        <p style={{fontSize:'12px', width:'500px', height:'40px', marginBottom:'-30px', color:'rgb(246, 100, 80)'}}>
                            Описание проекта должно содержать только буквы, цифры и иметь длину не более 150 символов!
                        </p>}      
                    </div>
                </div>
                <button onClick={sendProjectData} className={Styles.buttonCreate}>СОЗДАТЬ</button>
            </form>
        </CreateProject>
    );

    function validate() {
        let pr = validator.validateNameProject(projectName)
        let urlpr = validator.validateUrlProject(url)
        let prdesc = validator.validateDescProject(projectDescription.length)

        setValidateNameProject(!pr)
        setValidateUrlProject(!urlpr)
        setValidateDescProject(!prdesc)

        return pr && urlpr && prdesc;
    }
};

export default CreateProjectForm;