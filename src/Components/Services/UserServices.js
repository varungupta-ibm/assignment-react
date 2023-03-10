import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8080/api';
const CONT_TYPE = 'application/x-www-form-urlencoded';

// Authentication Instance
const auth = axios.create();
auth.interceptors.request.use(config => {
    config.baseURL = BASE_URL;
    config.headers['Content-Type'] = CONT_TYPE;
    return config;
});

// Logged-in user Instance
const user = axios.create();
user.interceptors.request.use(config => {
    config.baseURL = BASE_URL;
    config.headers['Content-Type'] = CONT_TYPE;
    config.headers['Authorization'] = localStorage.getItem('user-token');
    return config;
});

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
            console.log(err);
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