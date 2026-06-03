import React, { useContext, useState } from 'react'
import { PostContext } from '../context/PostContext'
import Comment from './Comment';
import User from './User';

const Post = () => {
    const { posts } = useContext(PostContext);
    const [openId, setOpenId] = useState(null);
    const [comment, setComments] = useState([]);

    return (
        <>
            {
                posts.map((post) => {

                    const wordTitle = post.title.split(' ');
                    const shortTitle = wordTitle.length > 5 ? wordTitle.slice(0, 5).join(' ') : post.title

                    const shortBody = post.body.split(' ').slice(0, 15).join(' ')
                    return (
                        <div key={post.id} className=" bg-white shadow-md rounded-xl p-4 m-2 ">
                            <p className='font-medium text-lg '>{shortTitle}</p>
                            <p>{shortBody}</p>
                            <hr className="my-4 border-gray-300" />
                            <div className='flex flex-col md:flex-row md:justify-between gap-4'>
                                <User id={post.userId} />

                                <Comment
                                    postId={post.userId}
                                    setComments={setComments}
                                    open={openId === post.id}
                                    toggle={() =>
                                        setOpenId(
                                            openId === post.id
                                                ? null
                                                : post.id
                                        )
                                    }
                                />

                            </div>
                            {
                                openId === post.id && (
                                    <div className="mt-4 w-full text-gray-600 bg-gray-100 p-4 rounded-lg">
                                        <p className='font-bold text-lg mb-2'>
                                            Comments
                                        </p>

                                        {comment.map((comment) => (
                                            <div key={comment.id} className='bg-white border-gray-100 rounded-xl p-4 m-2 ml-6'>
                                                <p className='font-medium text-black '>{comment.name}</p>
                                                <p>{comment.email}</p>
                                                <p className='mt-2  text-md font-normal'>{comment.body}</p>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    )
                })
            }
        </>
    )

}

export default Post