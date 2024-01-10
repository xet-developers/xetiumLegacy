import React, {useEffect, useState} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {AuthContext} from "./contex/IsAuth";
import CreateRouter from "./components/CreateRouter";
import {CurrentProjectContext, UserProjectsContext} from "./contex/CurrentProject";
import {Requests} from "./API/Requests";
import {LocalStorageManager} from "./misc/LocalStorageManager";

const App = () => {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    const [isAuth, setIsAuth] = useState(LocalStorageManager.getIsAuth() || false);
    const [currentProject, setCurrentProject] = useState(LocalStorageManager.getCurrentProject() || {})
    const [userProjects, setUserProjects] = useState(LocalStorageManager.getUserProjects() || [])

    useEffect(() => {
        const API = new Requests()

        API.registeredGet('account')
            .then(res => {
                if (res.ok) {
                    setIsAuth(true)
                } else {
                    setIsAuth(false)
                }
            })
    }, [])

    useEffect(() => {
        const API = new Requests()
        API.registeredGet("project")
            .then(async resp => {
                const res = await resp.json()
                setUserProjects(res)
                LocalStorageManager.setUserProjects(res)

                if(!LocalStorageManager.getCurrentProject() &&  typeof res[0] !== 'undefined'){
                    LocalStorageManager.setCurrentProject(res[0])
                    setCurrentProject(res[0])
                }
            })
            .catch(() =>
                setUserProjects(LocalStorageManager.getUserProjects())
            )
    }, [isAuth])

    return (
        <UserProjectsContext.Provider value={{
            userProjects, setUserProjects
        }}>
            <CurrentProjectContext.Provider value={{
                currentProject,
                setCurrentProject
            }}>
                <AuthContext.Provider value={{
                    isAuth,
                    setIsAuth,
                }}>
                    <BrowserRouter basename={baseUrl}>
                        <CreateRouter/>
                    </BrowserRouter>
                </AuthContext.Provider>
            </CurrentProjectContext.Provider>
        </UserProjectsContext.Provider>
    );
};


export default App;