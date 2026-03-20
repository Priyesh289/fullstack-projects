import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {

    const { loading, user, } = useContext(AuthContext)

    if (loading) {
        return <div>Loading...</div>
    }
    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute