import React from 'react';
import ProjectMenu from "../../components/UI/ProjectMenu";
import ClasteringSpace from "../../components/UI/ClasteringSpace";
import Styles from "../../styles/clastering.module.css";

const QueryClustering = () => {
    return (
        <div className={Styles.queryClustering}>
            <ProjectMenu/>
            <ClasteringSpace/>
        </div>
    );
};

export default QueryClustering;