export const authProvider = {
    login: ({ username, password }) => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        
        if (token && role === 'ROLE_ADMIN') {
            return Promise.resolve();
        }
        return Promise.reject('Not an admin');
    },

    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },

    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    checkAuth: () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        
        if (token && role === 'ROLE_ADMIN') {
            return Promise.resolve();
        }
        return Promise.reject();
    },

    getPermissions: () => {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};