import { createContext, Children, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import API_URL from "../services/api";


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [displayName, setDisplayName] = useState('');

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

    const editProfileName = async (username) => {
        try {
            const response = await axios.patch(`${API_URL}/profile`, { username }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = response.data;

            if (data.success) {
                setCurrentUser(data.data)

            }
        } catch (error) {
            console.log(error);

        }
    }

    const fetchUser = async () => {
        if (!token) {
            setCurrentUser(null);
            return
        }
        try {
            const response = await axios.get(`${API_URL}/profile/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = response.data;
            setCurrentUser(data.user);
            setDisplayName(data.user.name)
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
        currentUser, setCurrentUser, logout,
        setDisplayName, displayName, editProfileName
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