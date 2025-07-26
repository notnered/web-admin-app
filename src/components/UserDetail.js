export default function UserDetail(user) {
    return `
        <section id="user-detail">
            <h2>Информация о пользователе</h2>
            <p><strong>Логин:</strong> ${user.username}</p>
            <p><strong>Имя:</strong> ${user.first_name}</p>
            <p><strong>Фамилия:</strong> ${user.last_name}</p>
            <p><strong>Пол:</strong> ${user.gender}</p>
            <p><strong>Дата рождения:</strong> ${user.birthdate}</p>
            <button onclick="navigate('list')">Назад</button>
        </section>
    `;
}
