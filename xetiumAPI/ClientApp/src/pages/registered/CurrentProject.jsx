import React, {useContext, useState} from 'react';
import ProjectMenu from "../../components/UI/ProjectMenu";
import Tutorial from "../../components/Tutorial";
import {UserProjectsContext} from "../../contex/CurrentProject";

const CurrentProject = () => {
    const {userProjects, setProjects} = useContext(UserProjectsContext)
    const [modal, setModal] = useState(false);

    if (userProjects.length === 0) {
        return (
            <Tutorial modal={modal} setModal={setModal}/>
        )
    }

    return (
        <div>
            <ProjectMenu modal={modal} setModal={setModal}/>
        </div>
    );
};

export default CurrentProject;