import { renderRoute } from "../utils/utils";

export default function UserForm(user = {}) {
    const isEdit = Boolean(user.username);
    // console.log(isEdit);

    setTimeout(() => {
        const btn = document.getElementById('add-btn');
        if (!btn) return;
        if (isEdit) {
            // console.log('edit mode activated');
            btn.addEventListener('click', async () => {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const fullName = document.getElementById('full_name').value;
                const response = await fetch(
                    `http://localhost:3000/api/users/${user.id}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            name: fullName,
                        }),
                    }
                );
                if (!response.ok) {
                    console.error('Error:', response.status);
                    return;
                }

                const json = await response.json();
                // console.log(json);
                renderRoute('list');
                return;
            });
        } else {
            btn.addEventListener('click', async () => {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const fullName = document.getElementById('full_name').value;
                const response = await fetch(
                    'http://localhost:3000/api/users',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password,
                            name: fullName,
                        }),
                    }
                );
                if (!response.ok) {
                    console.error('Error:', response.status);
                    return;
                }

                const json = await response.json();
                // console.log(json);
                renderRoute('list');
            });
        }
    }, 0);

    return `
        <section id="user-form">
            <h2>${isEdit ? 'Редактировать' : 'Добавить'} пользователя</h2>
            <input type="text" id="username" placeholder="Логин" value="${
                user.username || ''
            }" ${isEdit ? 'readonly' : ''}>
            <input type="password" id="password" placeholder="Пароль">
            <input type="text" id="full_name" placeholder="ФИО" value="${
                (user.first_name + ' ' + user.last_name) || ''
            }">
            <select id="gender">
                <option value="m" ${
                    user.gender === 'm' ? 'selected' : ''
                }>Мужской</option>
                <option value="f" ${
                    user.gender === 'f' ? 'selected' : ''
                }>Женский</option>
            </select>
            <input type="date" id="birthdate" value="${user.birthdate || ''}">
            <button id="add-btn">
                ${isEdit ? 'Сохранить' : 'Создать'}
            </button>
        </section>
    `;
}
