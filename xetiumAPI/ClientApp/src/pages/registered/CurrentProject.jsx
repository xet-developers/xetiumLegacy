import React, {useContext, useEffect, useState} from 'react';
import ProjectMenu from "../../components/UI/ProjectMenu";
import Tutorial from "../../components/Tutorial";
import Styles from "../../styles/currentProject.module.css";

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
    //<p className={Styles.nameP}>Дата добавления: {date.getDate()} {date.getMonth() + 1} {date.getFullYear()}</p>

    return (
        <div className={Styles.main}>
            <ProjectMenu modal={modal} setModal={setModal}/>
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