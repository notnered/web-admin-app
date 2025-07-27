import { renderRoute, getUserId, isAdmin } from '../utils/utils';

export default function UserList(users = []) {
    setTimeout(() => {
        const deleteBtns = document.querySelectorAll('.delete');
        const viewBtns = document.querySelectorAll('.view');
        const editBtns = document.querySelectorAll('.edit');

        document
            .getElementById('sort-username')
            ?.addEventListener('click', () => {
                renderRoute('list', { sort: 'username' });
            });
        document
            .getElementById('sort-first_name')
            ?.addEventListener('click', () => {
                renderRoute('list', { sort: 'first_name' });
            });
        document
            .getElementById('sort-birthdate')
            ?.addEventListener('click', () => {
                renderRoute('list', { sort: 'birthdate' });
            });

        const resetSortBtn = document.getElementById('reset-sort')?.addEventListener('click', () => {
            renderRoute('list');
        });

        const params = new URLSearchParams(window.location.search);
        const currentSort = params.get('sort');
        const currentDirection = params.get('direction') || 'asc';

        ['username', 'first_name', 'birthdate'].forEach((field) => {
            const btn = document.getElementById(`sort-${field}`);
            if (btn) {
                btn.addEventListener('click', () => {
                    const isSame = currentSort === field;
                    const newDirection =
                        isSame && currentDirection === 'asc' ? 'desc' : 'asc';
                    renderRoute('list', {
                        sort: field,
                        direction: newDirection,
                    });
                });

                if (currentSort === field) {
                    btn.classList.add('active');
                    btn.innerHTML += currentDirection === 'asc' ? ' ▲' : ' ▼';
                }
            }
        });

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
            <div class="user-header">
                <h2 class="user-title">Пользователи</h2>
                <button id="reset-sort" class="sort-reset-btn">Сбросить сортировку</button>
            </div>
            <table class="user-table">
                <thead>
                    <tr>
                        <th><button id="sort-username" class="sort-btn">Логин</button></th>
                        <th><button id="sort-first_name" class="sort-btn">Имя</button></th>
                        <th><button id="sort-birthdate" class="sort-btn">Дата рождения</button></th>
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
