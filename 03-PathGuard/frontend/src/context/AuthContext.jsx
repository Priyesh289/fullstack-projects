import { createContext, Children, useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    )

    const saveToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem("token", newToken)
    }
    const value = { token, setToken, saveToken }

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