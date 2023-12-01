export const UserData = ( {users}) => {
    return (
        users.map ( (currentUser) => {
            const {system, keyWord, position} = currentUser;
            return (
                <tr>
                    <td>{system}</td>
                    <td>{keyWord}</td>
                    <td>{position}</td>
                </tr>
            )
        })
    )
}