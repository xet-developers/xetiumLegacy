import React, {useEffect, useState} from 'react';
import {BrowserRouter, useNavigate} from 'react-router-dom';
import {AuthContext} from "./contex/IsAuth";
import CreateRouter from "./components/CreateRouter";
import {CurrentProjectContext, UserProjectsContext} from "./contex/CurrentProject";


const App = () => {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false);
    const [currentProject, setCurrentProject] = useState(JSON.parse(localStorage.getItem("CurrentProject")) || {})
    const [userProjects, setUserProjects] = useState([])

    useEffect(() => {
        const params = {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem("jwt")
            }
        }
        const x = async () => {
            const res = await fetch('account', params)
            if (res.ok) {
                setIsAuth(true)
            }
        }

        x()

    }, [])
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