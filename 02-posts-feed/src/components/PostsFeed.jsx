import React from 'react'
import { useContext } from 'react'
import { PostContext } from '../context/PostContext'
import Post from './Post';

const Posts = () => {
  const { postError, postLoading, posts } = useContext(PostContext);

  if (postLoading) {
    return <h1>data loading...</h1>
  }
  if (postError) {
    return <h1>{postError}</h1>
  }



  return (
    <div className="w-[50%]"  >

      <h2 className='text-center font-bold text-black text-3xl'>Posts Feed</h2>

      <Post />


    </div>
  )
}

export default Posts