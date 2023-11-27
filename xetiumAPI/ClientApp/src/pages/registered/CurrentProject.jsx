import React, {useState} from 'react';
import ProjectMenu from "../../components/UI/ProjectMenu";
import Tutorial from "../../components/Tutorial";

const CurrentProject = () => {
    const [projects, setProjects] = useState([])
    const [modal, setModal] = useState(false);


    if (projects.length === 0) {
        return (
            <Tutorial modal={modal} setModal={setModal} projects={projects} setProjects={setProjects}/>
        )
    }

    return (
        <div>
            <ProjectMenu modal={modal} setModal={setModal} projects={projects} setProjects={setProjects}/>
        </div>
    );
};

export default CurrentProject;