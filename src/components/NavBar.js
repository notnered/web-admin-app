import { logout } from "../utils/utils"

export default function NavBar(){
    return (
        `
            <nav>
                <button onclick="navigate('list')">Пользователи</button>
                <button onclick="navigate('add')">Добавить</button>
                <button onclick="logout">Выйти</button>
            </nav>
        `
    )
}