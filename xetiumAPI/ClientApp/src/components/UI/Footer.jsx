import React from 'react';
import Styles from '../../styles/footer.module.css';
import logo from '../../images/logo.svg';

const Footer = () => {
    return (
        <footer>
            <div className={Styles.footer}>
                <div className={Styles.footerInfo}>

                    <div className = {Styles.columnItem}>
                        <a href='#'>
                            <img className={Styles.logo} src={logo} alt='logo'/>
                        </a>

                        <div className={Styles.document}>
                            <p>Политика конфиденциальности</p>
                            <p>Соглашение на обработку персональных данных</p>
                        </div>
                    </div>

                    <div className = {Styles.columnItem}>
                        <h4 className={Styles.footerH4}>ИНСТРУМЕНТЫ</h4>
                        <ul className={Styles.columnInfo}>
                            <li>Анализ позиций сайта</li>
                            <li>Кластеризация запросов</li>
                            <li>Формирование отчётов</li>
                        </ul>
                    </div>

                    <div className = {Styles.columnItem}>
                        <h4 className={Styles.footerH4}>О НАС</h4>
                        <ul className={Styles.columnInfo}>
                            <li>Информация о разработчиках</li>
                        </ul>
                    </div>

                    <div className = {Styles.columnItem}>
                        <h4 className={Styles.footerH4}>ПОДДЕРЖКА</h4>
                        <ul className={Styles.columnInfo}>
                            <li>FAQ</li>
                        </ul>
                    </div>

                    <div className = {Styles.columnItem}>
                        <h4 className={Styles.footerH4}>СВЯЗАТЬСЯ С НАМИ</h4>
                        <ul className={Styles.columnInfo}>
                            <li>xet.developers@mail.ru</li>
                        </ul>
                    </div>

                </div>
            </div>

            <div className={Styles.copyright}>
                <span>©️ XET Development, 2024</span>
            </div>

        </footer>
    );
};

export default Footer;