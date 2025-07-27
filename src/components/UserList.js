import { renderRoute, getUserId, isAdmin } from '../utils/utils';

export default function UserList(users = []) {
    setTimeout(() => {
        const deleteBtns = document.querySelectorAll('.delete');
        const viewBtns = document.querySelectorAll('.view');
        const editBtns = document.querySelectorAll('.edit');

        if (!deleteBtns || !viewBtns || !editBtns) return;

        deleteBtns.forEach((btn) =>
            btn.addEventListener('click', async () => {
                const userId = btn.id.split('-')[1];
                const currentUserId = getUserId();

                if (currentUserId === Number(userId)) {
                    console.error('You can not delete yourself');
                    return;
                }

                if (!isAdmin()) {
                    console.error(
                        'You can not delete users without admin rights'
                    );
                    return;
                }

                const response = await fetch(
                    `http://localhost:3000/api/users/${userId}`,
                    {
                        method: 'DELETE',
                    }
                );
                if (!response.ok) {
                    console.error('Error:', response.status);
                    return;
                }

                renderRoute('list');
            })
        );

        viewBtns.forEach((btn) =>
            btn.addEventListener('click', () => {
                const userId = btn.id.split('-')[1];
                const currentUserId = getUserId();

                if (!isAdmin()) {
                    if (currentUserId !== Number(userId)) {
                        console.error(
                            'You can not view other users without admin rights'
                        );
                        return;
                    }
                }

                renderRoute('user_detail', userId);
            })
        );

        editBtns.forEach((btn) =>
            btn.addEventListener('click', () => {
                const userId = btn.id.split('-')[1];
                const currentUserId = getUserId();

                if (!isAdmin() && currentUserId !== Number(userId)) {
                    console.error(
                        'You can not edit other users without admin rights'
                    );
                    return;
                }

                // if (currentUserId !== Number(userId)){
                //     console.error('You can not edit other users');
                //     return;
                // }

                renderRoute('add', userId);
            })
        );
    }, 0);

    // console.log(users);

    return `
        <section class="user-section">
            <h2 class="user-title">Пользователи</h2>
            <table class="user-table">
                <thead>
                    <tr>
                        <th onclick="sortBy('username')">Логин</th>
                        <th onclick="sortBy('first_name')">Имя</th>
                        <th onclick="sortBy('birthdate')">Дата рождения</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    ${users
                        .map(
                            (user) => `
                        <tr>
                            <td>${user.username}</td>
                            <td>${user.first_name}</td>
                            <td>${new Date(
                                user.birthdate
                            ).toLocaleDateString()}</td>
                            <td>
                                <button class="user-btn view" id="view-${
                                    user.id
                                }">Подробнее</button>
                                <button class="user-btn edit" id="edit-${
                                    user.id
                                }">Редактировать</button>
                                <button class="user-btn delete" id="delete-${
                                    user.id
                                }">Удалить</button>
                            </td>
                        </tr>
                    `
                        )
                        .join('')}
                </tbody>
            </table>
        </section>
`;
}
