import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('atelier_user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (user?.token) {
            API.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            localStorage.setItem('atelier_user', JSON.stringify(user));
        } else {
            delete API.defaults.headers.common['Authorization'];
            localStorage.removeItem('atelier_user');
        }
    }, [user]);

    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        setUser(res.data);
        return res.data;
    };

    const register = async (name, email, password) => {
        const res = await API.post('/auth/register', { name, email, password });
        setUser(res.data);
        return res.data;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);