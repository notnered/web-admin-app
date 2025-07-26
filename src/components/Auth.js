import { login, renderRoute } from '../utils/utils';

export default function Auth() {
    setTimeout(() => {
        const btn = document.getElementById('btn');
        if (!btn) return;

        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const success = await login({ username, password });
            console.log(success);
            // if (success) {
            //     renderRoute('list');
            // }
        });
    }, 0);

    return `
        <section id="auth">
            <h2>Вход администратора</h2>
            <input type="text" id="username" name="username" placeholder="Имя пользователя">
            <input type="password" id="password" name="password" placeholder="Пароль">
            <button id="btn">Войти</button>
        </section>
    `;
}
