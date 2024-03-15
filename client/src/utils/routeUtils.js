import { useAuth } from '../context/AuthContext';
export const routes = {
    '/': ['student', 'admin'],
    '/blog': ['student', 'admin'],
    '/learning': ['student', 'admin'],

    '/book/*': ['student', 'admin'],
    // '/book/1': ['student', 'admin'],
    '/books': ['student', 'admin'],
    '/book-form': ['admin'],
    '/training': ['student', 'admin'],
    '/students': ['admin'],
    '/resume': ['student'],
};


export const getAllowedRoutes = (role) => {
    const baseRoutes = {
        '/': ['student', 'admin'],
        '/blog': ['student', 'admin'],
        '/learning': ['student', 'admin'],

        '/book/:id': ['student', 'admin'],
        '/post/:id': ['student', 'admin'],
        '/videos': ['student', 'admin'],
        '/video-form': ['student', 'admin'],
        '/videourl': ['student', 'admin'],
        '/papers': ['student', 'admin'],
        // '/book/1': ['student', 'admin'],
        '/books': ['student', 'admin'],
        '/book-form': ['admin'],
        '/training': ['student', 'admin'],
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