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
            // console.log('login success:', success);

            if (success) {
                renderRoute('list');
                if (window.renderNavBar) window.renderNavBar();
            } else {
                alert('Ошибка входа');
            }
        });
    }, 0);

    return `
        <section id="auth" class="auth-section">
            <h2 class="auth-title">Вход администратора</h2>
            <input type="text" id="username" name="username" class="auth-input" placeholder="Имя пользователя">
            <input type="password" id="password" name="password" class="auth-input" placeholder="Пароль">
            <button id="btn" class="auth-button">Войти</button>
        </section>
    `;
}
