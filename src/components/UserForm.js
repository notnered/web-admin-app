export default function UserForm(user = {}) {
    const isEdit = Boolean(user.username);
    return `
        <section id="user-form">
            <h2>${isEdit ? 'Редактировать' : 'Добавить'} пользователя</h2>
            <input type="text" id="username" placeholder="Логин" value="${user.username || ''}" ${isEdit ? 'readonly' : ''}>
            <input type="password" id="password" placeholder="Пароль">
            <input type="text" id="first_name" placeholder="Имя" value="${user.first_name || ''}">
            <input type="text" id="last_name" placeholder="Фамилия" value="${user.last_name || ''}">
            <select id="gender">
                <option value="male" ${user.gender === 'male' ? 'selected' : ''}>Мужской</option>
                <option value="female" ${user.gender === 'female' ? 'selected' : ''}>Женский</option>
            </select>
            <input type="date" id="birthdate" value="${user.birthdate || ''}">
            <button onclick="${isEdit ? 'submitEdit()' : 'submitAdd()'}">
                ${isEdit ? 'Сохранить' : 'Создать'}
            </button>
        </section>
    `;
}
