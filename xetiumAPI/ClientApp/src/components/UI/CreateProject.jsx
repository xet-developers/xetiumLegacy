import React from 'react';
import Styles from '../../styles/CreateProject.module.css';

const CreateProject = ({children, visible, setVisible}) => {

    const rootClasses = [Styles.CreateProject]

    if (visible) {
        rootClasses.push(Styles.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={Styles.CreateProjectContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default CreateProject;