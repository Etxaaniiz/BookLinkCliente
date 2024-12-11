import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const registerUser = async (data: { username: string; email: string; password: string }) => {
    return axios.post(`${API_BASE_URL}/users/register`, data);
};

export const loginUser = async (data: { email: string; password: string }) => {
    return axios.post(`${API_BASE_URL}/users/login`, data);
};

export const searchBooks = async (query: string) => {
    return axios.get(`${API_BASE_URL}/books`, { params: { query } });
};

export const getFavorites = async (token: string) => {
    return axios.get(`${API_BASE_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};