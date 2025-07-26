import { renderRoute } from './utils/utils';

window.navigate = function(route) {
    renderRoute(route);
};

window.addEventListener('popstate', () => {
    const path = location.pathname.slice(1);
    renderRoute(path);
});
