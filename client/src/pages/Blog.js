import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Blogcard from '../component/Blogcard';
import Spinner from '../component/Spinner';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [isloaded, setIsLoaded] = useState(false);
    // get all blogs
    const getAllBlogs = async () => {
        try {
            setIsLoaded(true);
            const { data } = await axios.get('/api/v1/blog/allBlogs');
            setIsLoaded(false)
            if (data?.success) {
                setBlogs(data?.blogs)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllBlogs();
    }, [])
    return (
        <div>
            {isloaded && <Spinner />}
            {blogs?.map((blog) => <Blogcard
                id={blog?._id}
                isUser={blog.user._id === localStorage.getItem('userId')}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                time={blog?.createdAt}
            />)}
        </div>
    )
}
