import React from 'react';
import cl from '../../styles/CreateProject.module.css';

const CreateProject = ({children, visible, setVisible}) => {

    const rootClasses = [cl.CreateProject]

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.CreateProjectContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default CreateProject;