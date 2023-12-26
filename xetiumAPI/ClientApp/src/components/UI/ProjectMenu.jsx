import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import Styles from "../../styles/navMenu.module.css";

import logo from "../../images/logo.svg";
import CreateProjectForm from "./CreateProjectForm";
import UpperProjectMenu from "./UpperProjectMenu";
import {UserProjectsContext} from "../../contex/CurrentProject";


const ProjectMenu = ({projects}) => {
    const [modal, setModal] = useState(false);

    return (
        <nav className={Styles.menuWithLogo}>
            <img src={logo} alt="logo" width="180px" height="50px"/>
            <div className={Styles.menu}>

                    <UpperProjectMenu projects={projects} setModal={setModal}/>

                <div className={Styles.lowerMenu}>
                    <Link to={"/support"}>Поддержка</Link>
                    <Link to={"/confpolitic"}>Политика конфиденциальности</Link>
                </div>
            </div>

            <CreateProjectForm modal={modal} setModal={setModal}/>
        </nav>
    );
};

export default ProjectMenu;