import React from 'react';
import ProjectMenu from "../../components/UI/ProjectMenu";
import PersonalAccountSpace from "../../components/PersonalAccountSpace.jsx";
import Styles from "../../styles/clastering.module.css";

const PersonalAccount = () => {
    return (
        <div className={Styles.queryClustering}>
            <ProjectMenu/>
            <PersonalAccountSpace/>
        </div>
    );
};

export default PersonalAccount;