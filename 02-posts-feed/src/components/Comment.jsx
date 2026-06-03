import React, { memo, useEffect, useState } from 'react'
import axios from 'axios'


const Comment = memo(({ toggle, open, postId, setComments }) => {

    const fetchComment = async () => {
        try {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
            setComments(res.data)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        fetchComment()
    }, [postId])

    return (
        <div className=" cursor-pointer w-30 p-2 border border-gray-300 rounded-lg
         shadow-sm hover:scale-95 transition-transform duration-300"
        >
            <button
                onClick={toggle}
                className="flex items-center gap-2 font-medium text-sm border-none cursor-pointer"
            >
                Comments
                <span className=''>
                    {open ? '⬆️' : '⬇️'}
                </span>
            </button>
        </div>
    )
})

export default Comment