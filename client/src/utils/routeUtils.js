import { useAuth } from '../context/AuthContext';
export const routes = {
    '/': ['student', 'admin'],
    '/blog': ['student', 'admin'],
    '/learning': ['student', 'admin'],
    '/training': ['student', 'admin'],
    '/students': ['admin'],
    '/resume': ['student'],
};


export const getAllowedRoutes = (role) => {
    const baseRoutes = {
        '/': ['student', 'admin'],
        '/blog': ['student', 'admin'],
        '/learning': ['student'],
        '/training': ['student'],
        '/students': ['admin'],
        '/resume': ['student'],
    };

    return Object.entries(baseRoutes)
        .filter(([path, allowedRoles]) => allowedRoles.includes(role))
        .map(([path, name]) => ({
            to: path,
            name,
        }));
};