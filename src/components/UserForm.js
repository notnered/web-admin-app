import { renderRoute } from '../utils/utils';

export default function UserForm(user = {}) {
    const isEdit = Boolean(user.username);
    // console.log(isEdit);

    setTimeout(() => {
        const btn = document.getElementById('add-btn');
        if (!btn) return;
        if (isEdit) {
            // console.log('edit mode activated');
            btn.addEventListener('click', async (e) => {
                // console.log('edit');
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const fullName = document.getElementById('full_name').value;
                const gender = document.getElementById('gender').value;
                const birthdate = document.getElementById('birthdate').value;
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
                            gender: gender,
                            birthdate: birthdate,
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
            btn.addEventListener('click', async (e) => {
                // console.log('add')
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const fullName = document.getElementById('full_name').value;
                const gender = document.getElementById('gender').value;
                const birthdate = document.getElementById('birthdate').value;
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
                            gender: gender,
                            birthdate: birthdate,
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
        }
    }, 0);

    return `
    <section class="user-form">
        <h2 class="user-form__title">${
            isEdit ? 'Редактировать' : 'Добавить'
        } пользователя</h2>
        <input class="user-form__input" type="text" id="username" placeholder="Логин" value="${
            user.username || ''
        }" ${isEdit ? 'readonly' : ''}>
        <input class="user-form__input" type="password" id="password" placeholder="Пароль" value="${
            user.password || ''
        }">
        <input class="user-form__input" type="text" id="full_name" placeholder="ФИО" value="${
            user.first_name ? user.first_name + ' ' + user.last_name : ''
        }">
        <select class="user-form__select" id="gender">
            <option value="m" ${
                user.gender === 'm' ? 'selected' : ''
            }>Мужской</option>
            <option value="f" ${
                user.gender === 'f' ? 'selected' : ''
            }>Женский</option>
        </select>
        <input class="user-form__input" type="date" id="birthdate" max="${new Date().toISOString().slice(0, 10)}" value="${
            user.birthdate
                ? new Date(user.birthdate).toISOString().slice(0, 10)
                : ''
        }">
        <button class="user-form__btn" id="add-btn">${
            isEdit ? 'Сохранить' : 'Создать'
        }</button>
    </section>
`;
}
