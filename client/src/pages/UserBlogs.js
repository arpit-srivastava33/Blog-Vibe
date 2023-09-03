import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Blogcard from '../component/Blogcard';
import Spinner from '../component/Spinner';

export default function UserBlogs() {
    const [blogs, setBlogs] = useState([])
    const [userName, setUserName] = useState("");
    // get user blogs
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`/api/v1/blog/userBlog/${id}`)
            if (data.success) {
                setUserName(data.userBlog.username);
                setBlogs(data.userBlog.blog)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserBlogs();
    }, [])
    return (
        <div>
            {blogs && blogs.length > 0 ? (blogs.map((blog) => <Blogcard
                title={blog?.title}
                id={blog?._id}
                isUser={true}
                description={blog?.description}
                image={blog?.image}
                username={userName}
            />)) : (<Spinner />)}
        </div>
    )
}
