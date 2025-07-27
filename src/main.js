import NavBar from './components/NavBar';
import { renderRoute, isLogged, logout } from './utils/utils';
import './router';
import './static/style.css';

window.renderNavBar = function () {
    const navContainer = document.getElementById('nav-container');
    if (!navContainer) return;

    navContainer.innerHTML = NavBar();

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            logout();
            window.renderNavBar();
            renderRoute('auth', null, false);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#app').innerHTML = `
        <div>
            <nav id="nav-container"></nav>
            <main id="main"></main>
        </div>
    `;

    renderNavBar();

    const currentPath = location.pathname.slice(1);
    renderRoute(currentPath || (isLogged() ? 'list' : 'auth'), null, false);
});
