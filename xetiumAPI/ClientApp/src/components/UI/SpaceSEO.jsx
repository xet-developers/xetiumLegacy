import React from 'react';
import Styles from "../../styles/searchPosition.module.css";
import Arrow from "../../images/arrowSeo.svg";
import Line from "../../images/line.svg";


const SpaceSEO = () => {
    return (
        <div>
            <section className={Styles.header}>
                <div>
                    <img src= {Arrow} alt = "arrow" className={Styles.arrow}/>
                    <p className={Styles.headerText}>Проверка позиций</p>
                    <img src= {Line} alt = "line" className={Styles.line}/>
                </div>
            </section>

            <section>
                <div>
                    <p className={Styles.h}>Добавление ключевых слов</p>
                    <input type="text" id="uname" name="name" placeholder="" className={Styles.input} formMethod='post' formEncType=''/>
                    <br/>
                    <label for="uname">Введите ключевое слово - каждое слово с новой строки.</label>
                    <br/>
                    <button className={Styles.sendKey}>Отправить</button>
                </div>
            </section>
            
            <section>
                <div>
                    <p className={Styles.h}>Результат проверки позиций</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Ключевое слово</th>
                                <th>Яндекс</th>
                                <th>Google</th>
                            </tr>
                        </thead>
                        <tbody>
                            { _____ .map(item => (
                                <tr key={item.id}>
                                    <td>{item.keyWord}</td>
                                    <td>{item.yandex}</td>
                                    <td>{item.google}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default SpaceSEO;