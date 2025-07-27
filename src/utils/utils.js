import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import UserDetail from '../components/UserDetail';
import Auth from '../components/Auth';
import { jwtDecode } from 'jwt-decode';

export async function renderRoute(route, payload = null, push = true) {
    const main = document.getElementById('main');
    if (!main) return;

    const currentUserId = getUserId();

    switch (route) {
        case 'list':
            if (!currentUserId) {
                renderRoute('auth', null, true);
                return;
            }

            const currentUserData = await fetch(
                'http://localhost:3000/api/users/' + currentUserId
            );
            if (!currentUserData.ok) {
                console.error('Error:', currentUserData.status);
                return;
            }

            if (!isAdmin()) {
                const currentUserJson = await currentUserData.json();
                main.innerHTML = UserList(Array(currentUserJson));
                break;
            }

            if (!isLogged()) {
                renderRoute('auth', null, true);
                return;
            }

            // if (!isAdmin()){
            //     renderRoute('auth', null, true);
            //     return;
            // }

            const usersData = await fetch('http://localhost:3000/api/users');
            const usersJson = await usersData.json();

            const sortField = payload?.sort;
            const direction = payload?.direction || 'asc';

            if (sortField) {
                usersJson.sort((a, b) => {
                    let valA = a[sortField];
                    let valB = b[sortField];

                    if (sortField === 'birthdate') {
                        valA = new Date(valA);
                        valB = new Date(valB);
                    } else {
                        valA = valA.toLowerCase();
                        valB = valB.toLowerCase();
                    }

                    const res = valA > valB ? 1 : valA < valB ? -1 : 0;
                    return direction === 'asc' ? res : -res;
                });
            }

            main.innerHTML = UserList(usersJson);
            break;
        case 'add':
            if (payload) {
                if (!isAdmin() && currentUserId !== Number(payload)) {
                    renderRoute('auth', null, true);
                    break;
                }
                // console.log('edit', payload);
                const userResponse = await fetch(
                    `http://localhost:3000/api/users/${payload}`
                );
                if (!userResponse.ok) {
                    console.error('Error:', userResponse.status);
                    break;
                }

                const userData = await userResponse.json();
                // console.log(userData);
                main.innerHTML = UserForm(userData);
                break;
            }
            if (!isAdmin()) {
                renderRoute('auth', null, true);
                break;
            }

            main.innerHTML = UserForm();
            break;
        case 'auth':
            main.innerHTML = Auth();
            break;
        case 'user_detail':
            if (!payload) {
                console.error('No payload');
                return;
            }

            const userResponse = await fetch(
                `http://localhost:3000/api/users/${payload}`
            );
            if (!userResponse.ok) {
                console.error('Error:', userResponse.status);
                return;
            }

            const userData = await userResponse.json();
            // console.log(userData);
            main.innerHTML = UserDetail(userData);
            break;
        default:
            main.innerHTML = `<p>Неизвестный маршрут</p>`;
    }

    if (push) {
        const url = new URL(window.location);
        url.pathname = `/${route}`;

        if (payload && typeof payload === 'object') {
            url.search = new URLSearchParams(payload).toString();
        } else {
            url.search = '';
            if (typeof payload === 'string') {
                url.pathname += `/${payload}`;
            }
        }

        window.history.pushState({}, '', url.toString());
    }
}

export function isLogged() {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    return true;
}

export function isAdmin() {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== 'admin') {
        return false;
    }

    // console.log(decodedToken);
    return true;
}

export function getUserId() {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    const decodedToken = jwtDecode(token);
    return decodedToken.id;
}

export async function login(credentials) {
    if (isLogged()) {
        return false;
    }

    const { username, password } = credentials;
    if (!username || !password) {
        return false;
    }

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    });
    // console.log(response);
    if (!response.ok) {
        return false;
    }

    const tokenJson = await response.json();
    // console.log(tokenJson);
    if (!tokenJson) {
        return false;
    }

    localStorage.setItem('token', tokenJson.token);

    return true;
}

export function logout() {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    localStorage.removeItem('token');
    return true;
}
