export const UserData = ({users}) => {
    const a = [];
    users.map((currentUser) => {
        for (let key of currentUser?.keywordResults) {
            a.push((<tr>
                <td>{currentUser.type}</td>
                <td>{key.keyword.text}</td>
                <td>{key.position}</td>
            </tr>))
        }
    })

    return (
        a.map(b => b)
    )
}