import React from 'react';
import {Link} from "react-router-dom";

const ProjectMenu = () => {
    const paths = ['currentproject', 'queryclustering', 'report', 'siteposition']

    return (
        <nav>
            {paths.map(el => <Link to={'/' + el}>{el}        </Link>)}
        </nav>
    );
};

export default ProjectMenu;