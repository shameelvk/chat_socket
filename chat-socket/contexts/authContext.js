import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authService from '../services/authService';
import { useRouter } from 'expo-router';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const router = useRouter();



    const updateToken = async (token) => {
        try {
            if (!token) return;
            // Save token to AsyncStorage
            await AsyncStorage.setItem('token', token);

            // Decode token and extract user info
            const decodedUser = jwtDecode(token);

            // Update state
            setToken(token);
            setUser(decodedUser?.user);
        } catch (err) {
            console.error('Error in updateToken:', err.message);
        }
    };



    // 🔐 Login using service
    const signin = async (email, password) => {
        const { token } = await authService.login(email, password);
        await updateToken(token);
        router.replace('/(main)/home');

    };

    // 📝 Signup using service
    const signup = async (name, email, password, avatar = "") => {
        console.log({ name, email, password, avatar });

        const { token } = await authService.register(name, email, password, avatar);
        await updateToken(token);
        router.replace('/(main)/home');
    };

    // 🔓 Logout
    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        setToken(null);
        setUser(null);
        router.replace('/(auth)/welcome');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                signin,
                signup,
                logout,
                updateToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
