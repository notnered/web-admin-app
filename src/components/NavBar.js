import { isLogged, logout, isAdmin } from '../utils/utils';

export default function NavBar() {
    setTimeout(() => {
        const logoutBtn = document.getElementById('logout-btn');
        const navAddBtn = document.getElementById('nav-add-btn');
        
        if (!isAdmin() || !isLogged()) {
            navAddBtn.style.display = 'none';
            return;
        };
        if (!logoutBtn && !isLogged()) return;
        logoutBtn.addEventListener('click', () => logout());
    }, 0);

    return `
            <nav class="navbar">
                <button class="navbar-btn" onclick="navigate('list')">Пользователи</button>
                <button id="nav-add-btn" class="navbar-btn" onclick="navigate('add')">Добавить</button>
                ${
                    isLogged()
                        ? `<button class="navbar-btn" id="logout-btn">Выйти</button>`
                        : `<button class="navbar-btn" onclick="navigate('auth')">Вход</button>`
                }
            </nav>
        `;
}