import axios from 'axios';
import { Platform } from 'react-native';



const API_BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3030/api' : 'http://localhost:3030/api'

// 🔐 Login
export const login = async (email, password) => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
    return res.data;
};

// 📝 Register
export const register = async (name, email, password, avatar = "") => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password, avatar });
    return res.data;
};
