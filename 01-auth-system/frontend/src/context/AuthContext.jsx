import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import API from '../api/axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [state, setState] = useState("login");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const getUser = async () => {
        try {
            setLoading(true)
            const { data } = await API.get('/user');
            if (data.success) {
                setUser(data.user)
            } else {
                setUser(null);
                toast.error(data.message)
            }
        } catch (error) {
            setUser(null);
            toast.error(error.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    const registerUser = async (name, email, password) => {
        try {
            const { data } = await API.post('/register', { name, email, password });
            if (data.success) {
                console.log(name, email, password)
                await getUser()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Somthing went wrong')
        }
    }

    const loginUser = async (email, password) => {
        try {
            const { data } = await API.post('/login', { email, password });
            if (data.success) {
                await getUser()

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message || 'Somthing went wrong')
        }
    }

    
    const userLogout = async () => {
        try {
            const { data } = await API.get('/logout');

            if (data.success) {
                setUser(null); 
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const value = { axios, user, setUser, registerUser, userLogout, loginUser, state, setState, loading, setLoading }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider