import Styles from "../../styles/clastering.module.css";

export const ClasteringData = () => {
    const plug = [];

    plug.push((
        <tr>
            <td>
                23.12.23
            </td>

            <td>
                123
            </td>

            <td>
                23
            </td>

            <td>
                <a href = "#" className={Styles.link}>Скачать</a>
            </td>
        </tr>
    ))

    return (
        plug.map(a => a)
    )
};