import React from 'react';
import ProjectMenu from "../../components/UI/ProjectMenu";
import SpaceReport from '../../components/UI/SpaceReport';

const Report = () => {
    return (
        <div style = {{display: "flex"}}>
            <ProjectMenu />
            <SpaceReport/>
        </div>
    );
};

export default Report;