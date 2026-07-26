import { createContext, Children, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import API_URL from "../services/api";
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [token, setToken] = useState(
        () => localStorage.getItem("token") || ""
    );
    const saveToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken)
    }

    const signup = async (username, email, password) => {

        console.log("I am in context")
        const response = await axios.post(`${API_URL}/register`, {
            email, password, username
        });

        const data = response.data;
        console.log(data)
        return data;
    }

    const logout = (token) => {
        localStorage.removeItem('token');
        setToken('');
        setCurrentUser(null);
    }

    const fetchUser = async () => {
        if (!token) {
            setCurrentUser(null);
            return
        }
        try {
            const response = await axios.get(`${API_URL}/profile/`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            setCurrentUser(data.user)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchUser();
    }, [token]);

    const value = {
        isAuthenticated: !!currentUser,
        signup, token, setToken, saveToken,
        currentUser, setCurrentUser, logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (() =>
    useContext(AuthContext)
)

export default AuthProvider