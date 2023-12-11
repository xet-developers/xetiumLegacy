import Styles from "../../styles/report.module.css";

export const ReportData = () => {
    const plug = [];

    plug.push((
    <tr>
        <td>11.12.23</td>
        <td>Динамика позиций сайта за интервал времени</td>
        <td>01.10.23 - 01.12.23</td>
        <td><a href="https://vk.com/grozyler" className={Styles.link}>Скачать</a></td>
    </tr>))

    return (
        plug.map(b => b)
    )
}