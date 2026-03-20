import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Home = () => {

    const { user, userLogout } = useContext(AuthContext);

    return (
        <div>
            <h3>{user.name}</h3>
            <button onClick={userLogout}>LogOut</button>
        </div>
    )
}

export default Home;