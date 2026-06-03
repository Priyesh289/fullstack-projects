import axios from 'axios'
import React, { useEffect, useState } from 'react'

const User = ({ id }) => {

  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);

      setUser(res.data)
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchUser()
  }, [id]);

  if (!user) {
    return <p>Loading...</p>
  }


  const firstLetter =
    user.name.charAt(0).toUpperCase();

  return (
    <div>

      <div key={id} className="flex items-center gap-2 p-2 pt-0">

        {/* User Icon */}
        <div className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs flex items-center
         justify-center font-bold">
          {firstLetter}
        </div>

        {/* User Name */}
        <h2 className='font-semibold text-md'>{user.name}</h2>

      </div>

    </div>
  )
}

export default User