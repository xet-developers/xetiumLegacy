export const UserData = ({users}) => {
    const a = [];
    users.map((currentUser) => {
        let pos = '';
       
        for (let key of currentUser?.keywordResults) {
            if (key.position === -1) pos = 'больше 100'
            a.push((<tr>
                <td>{currentUser.type}</td>
                <td>{key.keyword.text}</td>
                <td>{pos}</td>
            </tr>))
        }
    })

    return (
        a.map(b => b)
    )
}