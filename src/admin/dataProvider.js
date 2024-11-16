import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:8081';

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    if (token) {
        options.headers.set('Authorization', `Bearer ${token}`);
    }
    return fetchUtils.fetchJson(url, options);
};

export const dataProvider = {
    getList: async (resource, params) => {
        if (resource === 'users') {
            const url = `${apiUrl}/user/get-all`;
            const { json } = await httpClient(url, {
                method: 'POST',
            });
            
            return {
                data: json.map(user => ({
                    ...user,
                    id: user.id || user.email
                })),
                total: json.length
            };
        }
        return { data: [], total: 0 };
    },

    getOne: async (resource, params) => {
        if (resource === 'users') {
            const { json } = await httpClient(`${apiUrl}/user/get-all`, {
                method: 'POST',
            });
            const user = json.find(u => u.id === params.id || u.email === params.id);
            return { data: user || {} };
        }
        return { data: {} };
    },

    create: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        });
        return { data: { ...params.data, id: json.id || json.email } };
    },

    update: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        });
        return { data: json };
    },

    delete: async (resource, params) => {
        await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        });
        return { data: params.previousData };
    },

    deleteMany: async (resource, params) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/bulk-delete`, {
            method: 'POST',
            body: JSON.stringify(params.ids),
        });
        return { data: [] };
    },

    getMany: async (resource, params) => {
        if (resource === 'users') {
            const { json } = await httpClient(`${apiUrl}/user/get-all`, {
                method: 'POST',
            });
            const filtered = json.filter(item => 
                params.ids.includes(item.id || item.email)
            );
            return { data: filtered };
        }
        return { data: [] };
    }
};