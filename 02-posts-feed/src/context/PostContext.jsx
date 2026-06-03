import { useEffect } from "react";
import { createContext, useState } from "react";
import axios from 'axios'
export const PostContext = createContext()

function PostContextProvider({ children }) {
    const [posts, setPosts] = useState([]);
    const [postLoading, setPostLoading] = useState(false);
    const [postError, setPostError] = useState(null);
    

    const fetchPost = async () => {
        setPostLoading(true)
        try {
            let res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data)
        } catch (error) {
            console.log(error);
            setPostError(error.message)
        }
        setPostLoading(false)
    }

    useEffect(() => {
        fetchPost()
    }, [])

    const value = { postError, postLoading, posts }
    return (
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProvider