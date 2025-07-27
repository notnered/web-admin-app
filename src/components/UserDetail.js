export default function UserDetail(user) {
    return `
    <section class="user-detail">
        <h2 class="user-detail__title">Информация о пользователе</h2>
        <div class="user-detail__info">
            <p><strong>Логин:</strong> ${user.username}</p>
            <p><strong>Роль:</strong> ${
                user.role === 'admin' ? 'Администратор' : 'Пользователь'
            }</p>
            <p><strong>Имя:</strong> ${user.first_name}</p>
            ${
                user.last_name
                    ? `<p><strong>Фамилия:</strong> ${user.last_name}</p>`
                    : ''
            }
            <p><strong>Пол:</strong> ${
                user.gender === 'm' ? 'Мужской' : 'Женский'
            }</p>
            <p><strong>Дата рождения:</strong> ${new Date(
                user.birthdate
            ).toLocaleDateString()}</p>
        </div>
        <button class="user-detail__btn" onclick="navigate('list')">Назад</button>
    </section>
`;
}
