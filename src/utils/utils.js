import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import UserDetail from '../components/UserDetail';
import Auth from '../components/Auth';

export async function renderRoute(route, payload = null, push = true) {
    const main = document.getElementById('main');
    if (!main) return;

    switch (route) {
        case 'list':
            if (!isLogged()){
                renderRoute('auth', null, true);
                return;
            }
            const usersData = await fetch('http://localhost:3000/api/users');
            const usersJson = await usersData.json();
            main.innerHTML = UserList(usersJson);
            break;
        case 'add':
            if (payload){
                // console.log('edit', payload);
                const userResponse = await fetch(`http://localhost:3000/api/users/${payload}`);
                if (!userResponse.ok){
                    console.error('Error:', userResponse.status);
                    return;
                }

                const userData = await userResponse.json();
                // console.log(userData);
                main.innerHTML = UserForm(userData);
                break;
            }
            main.innerHTML = UserForm();
            break;
        case 'auth':
            main.innerHTML = Auth();
            break;
        case 'user_detail':
            main.innerHTML = UserDetail(payload);
            break;
        default:
            main.innerHTML = `<p>Неизвестный маршрут</p>`;
    }

    if (push) {
        window.history.pushState({}, '', '/' + route);
    }
}

export function isLogged(){
    const token = localStorage.getItem('token');
    if (!token){
        return false;
    };
    
    return true;
}

export async function login(credentials){
    if (isLogged()){
        return false;
    }

    const { username, password } = credentials;
    if (!username || !password){
        return false;
    };

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    });
    // console.log(response);
    if (!response.ok){
        return false;
    }

    const tokenJson = await response.json();
    console.log(tokenJson);
    if (!tokenJson){
        return false;
    };

    localStorage.setItem('token', tokenJson.token);
    
    return true;
}

export function logout(){
    const token = localStorage.getItem('token');
    if (!token){
        return false;
    };

    localStorage.removeItem('token');
    return true;
}