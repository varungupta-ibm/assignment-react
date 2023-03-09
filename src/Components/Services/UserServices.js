import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8080/api';
const AUTH_TOKEN = localStorage.getItem('user-token');

const auth = axios.create({
    baseURL: BASE_URL
});
auth.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const user = axios.create({
    baseURL: BASE_URL
});
user.defaults.headers.common['Authorization'] = AUTH_TOKEN;
user.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const service = {
    LoginUser: async (req) => {
        try {
            const res = await auth.post('/sign-in', req);
            if (res && res.status === 200) {
                return res.data;
            } else {
                throw res;
            }
        } catch (err) {
            throw err.response.data;
        }
    },
    RegisterUser: async (req) => {
        try {
            const res = await auth.post('/sign-up', req);
            if (res && res.status === 200) {
                return res.data;
            } else {
                throw res;
            }
        } catch (err) {
            throw err.response.data;
        }
    },
    getEmployers: async () => {
        try {
            const res = await auth.get('/list-employers');
            if (res && res.status === 200) {
                return res.data;
            } else {
                throw res;
            }
        } catch (err) {
            throw err.response.data;
        }
    },
    getUserDetails: async (req) => {
        try {
            const res = await user.post('/check');
            if (res && res.status === 200) {
                return res.data;
            } else {
                throw res;
            }
        } catch (err) {
            throw err.response.data;
        }
    },
    getEmployees: async (req) => {
        try {
            const res = await user.post('/get-all-users', req);
            if (res && res.status === 200) {
                return res.data;
            } else {
                throw res;
            }
        } catch (err) {
            throw err.response.data;
        }
    },
    verifyUser: async (req) => {
        try {
            const res = await user.put(`/verify-employee/${req}`);
            if (res && res.status === 200) {
                return res.data;
            } else {
                throw res;
            }
        } catch (err) {
            throw err.response.data;
        }
    }
};

export default service;