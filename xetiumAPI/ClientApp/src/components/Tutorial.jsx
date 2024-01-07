import Styles from '../styles/tutorial.module.css';
import {Link} from "react-router-dom";
import UIButton from "./UI/UIButton";
import CreateProjectForm from "./UI/CreateProjectForm";
import {useState} from "react";

const Tutorial = () => {
    const [modal, setModal] = useState(false);

    return (
        <div className={Styles.tutorialPart}>
            <div>
                <h1 className={Styles.tutorial}>
                    <p className={Styles.tutorialHead}>Добро пожаловать в сервис анализа позиций сайта!</p>
                    <p className={Styles.tutorialDesc}>Скоро здесь будет написана подробная инструкция.</p>
                </h1>
                <div></div>
                <span className={Styles.creation}>
                    <Link to={'/'}>
                        <UIButton className={Styles.buttonGo} onClick={()=>setModal(true)}>
                            <span className={Styles.textGo}>Перейти к работе</span>
                        </UIButton>
                    </Link>
                </span>
            </div>
            <CreateProjectForm modal={modal} setModal={setModal}/>
        </div>
    );
};

export default Tutorial;