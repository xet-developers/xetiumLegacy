import React from 'react';
import ProjectMenu from '../../components/UI/ProjectMenu';
import SpaceSEO from '../../components/UI/SpaceSEO';

const SitePosition = () => {
    return (
        <div style = {{display: "flex"}}>
            <ProjectMenu/>
            <SpaceSEO/>
        </div>
    );
};

export default SitePosition;