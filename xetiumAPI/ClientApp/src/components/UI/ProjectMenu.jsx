import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Styles from "../../styles/navMenu.module.css"

import logo from "../../images/logo.svg";
import CreateProjectForm from "./CreateProjectForm";
import UpperProjectMenu from "./UpperProjectMenu";


const ProjectMenu = ({modal, setModal, setProjects, projects}) => {
    console.log("dada")

    return (
        <nav className={Styles.menuWithLogo}>
            <img src={logo} alt="Logo" width="180px" height="50px"/>
            <div className={Styles.menu}>
                <UpperProjectMenu projects={projects} setModal={setModal}/>)

                <div className={Styles.lowerMenu}>
                    <Link to={"/support"}>Поддержка</Link>
                    <Link to={"/confpolitic"}>Политика конфиденциальности</Link>
                </div>
            </div>

            <CreateProjectForm modal={modal}  setModal={setModal} projects={projects} setProjects={setProjects}/>
        </nav>
    );
};

export default ProjectMenu;