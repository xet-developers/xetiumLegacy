import React from 'react';
import Styles from '../styles/tutorial.module.css';
import {Link} from "react-router-dom";
import UIButton from "./UI/UIButton";
import CreateProjectForm from "./UI/CreateProjectForm";

const Tutorial = ({modal, setModal, setProjects, projects}) => {
    return (
        <div style={{display: "flex"}}>
            <div>
                <h1 className={Styles.tutorial}>
                    <p>Добро пожаловать в сервис анализа позиций сайта!</p>
                    <p>Скоро здесь будет написана подробная инструкция ♥</p>
                </h1>
                <div className={Styles.rectangle}></div>
                <span>
                    <p className={Styles.textForButton}>Как только будете готовы создать проект, нажмите сюда</p>
                    <Link to={'/'}>
                        <UIButton className={Styles.buttonGo} onClick={()=>setModal(true)}>
                            <span className={Styles.textGo}>Приступить!</span>
                        </UIButton>
                    </Link>
                </span>
            </div>
            <CreateProjectForm modal={modal} setModal={setModal} projects={projects} setProjects={setProjects}/>

        </div>
    );
};

export default Tutorial;