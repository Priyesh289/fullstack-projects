import { createContext, Children, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import API_URL from "../services/api";
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    )

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
        
        return data;
    }



    const value = {
        signup, token, setToken, saveToken,
        currentUser, setCurrentUser
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