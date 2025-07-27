import { renderRoute } from "../utils/utils";

export default function UserList(users = []) {

    setTimeout(() => {
        const deleteBtns = document.querySelectorAll('.delete');
        const viewBtns = document.querySelectorAll('.view');
        const editBtns = document.querySelectorAll('.edit');

        if (!deleteBtns || !viewBtns || !editBtns) return;

        deleteBtns.forEach(btn => btn.addEventListener('click', async () => {
            const userId = btn.id.split('-')[1];
            const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                console.error('Error:', response.status);
                return;
            }
            window.location.reload();
        }));

        viewBtns.forEach(btn => btn.addEventListener('click', () => {
            const userId = btn.id.split('-')[1];
            renderRoute('user_detail', userId);
        }));

        editBtns.forEach(btn => btn.addEventListener('click', () => {
            const userId = btn.id.split('-')[1];
            renderRoute('add', userId);
        }));
    }, 0);

    console.log(users);


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
                            <td>${new Date(user.birthdate).toLocaleDateString()}</td>
                            <td>
                                <button class="view" id="view-${user.id}">Подробнее</button>
                                <button class="edit" id="edit-${user.id}">Редактировать</button>
                                <button class="delete" id="delete-${user.id}">Удалить</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </section>
    `;
}
