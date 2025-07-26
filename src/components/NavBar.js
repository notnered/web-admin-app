import { isLogged, logout } from "../utils/utils"

export default function NavBar(){

    setTimeout(() => {
        const logoutBtn = document.getElementById('logout-btn');
        if (!logoutBtn) return;

        logoutBtn.addEventListener('click', () => logout());
    }, 0)

    return (
        `
            <nav>
                <button onclick="navigate('list')">Пользователи</button>
                <button onclick="navigate('add')">Добавить</button>
                ${isLogged() ? `<button id="logout-btn">Выйти</button>` : `<button onclick="navigate('auth')">Вход</button>`}
            </nav>
        `
    )
}