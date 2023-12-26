import React, {useContext, useEffect, useState} from 'react';
import ProjectMenu from "../../components/UI/ProjectMenu";
import Tutorial from "../../components/Tutorial";

import {CurrentProjectContext, UserProjectsContext} from "../../contex/CurrentProject";

const CurrentProject = () => {
    const {userProjects, setUserProjects} = useContext(UserProjectsContext)
    const {currentProject, setCurrentProject} = useContext(CurrentProjectContext)
    const [modal, setModal] = useState(false);

    const request = async () => {
        const params = {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            }
        }

        const resp = await fetch("/project", params)

        if (resp.ok) {
            const res = await resp.json()
            console.log(res)
            setUserProjects(res)
            localStorage.setItem("UserProjects", JSON.stringify(res))
            return true
        }

        if (localStorage.getItem("UserProjects")) {
            setUserProjects(JSON.parse(localStorage.getItem("UserProjects")))
            return true
        }

        return false
    }

    useEffect(() => {
        const request = async () => {
            const params = {
                method: "GET",
                headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem("jwt")
                }
            }
    
            const resp = await fetch("/project", params)
    
            if (resp.ok) {
                const res = await resp.json()
                console.log(res)
                setUserProjects(res)
                localStorage.setItem("UserProjects", JSON.stringify(res))
                return true
            }
    
            if (localStorage.getItem("UserProjects")) {
                setUserProjects(JSON.parse(localStorage.getItem("UserProjects")))
                return true
            }
    
            return false
        }
        request()
    }, [])
    
    if (userProjects.length === 0) {
        return (
            <Tutorial modal={modal} setModal={setModal}/>
        )
    }

    function getDateFromUuid7(uuid) {
        console.log(uuid)
        let num = parseInt(uuid.replace(/-/g, ""), 16);
        let timestamp = num / Math.pow(2, 60) * 1000;
        console.log(timestamp)
        return new Date(timestamp);
    }

    const date = new Date(currentProject.id);

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