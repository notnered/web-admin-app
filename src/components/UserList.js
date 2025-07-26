export default function UserList(users = []) {
    return `
        <section id="user-list">
            <h2>Пользователи</h2>
            <table>
                <thead>
                    <tr>
                        <th onclick="sortBy('username')">Логин</th>
                        <th onclick="sortBy('first_name')">Имя</th>
                        <th onclick="sortBy('birthdate')">Дата рождения</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(user => `
                        <tr>
                            <td>${user.username}</td>
                            <td>${user.first_name}</td>
                            <td>${user.birthdate}</td>
                            <td>
                                <button onclick="viewUser('${user.username}')">Подробнее</button>
                                <button onclick="editUser('${user.username}')">Редактировать</button>
                                <button onclick="deleteUser('${user.username}')">Удалить</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </section>
    `;
}
