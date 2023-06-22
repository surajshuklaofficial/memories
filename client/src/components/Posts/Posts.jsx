import React from "react";
import { useSelector } from "react-redux";

import Post from "./Post/Post";

const Posts = ({setCurrentId}) => {
    // alert('hi')
    const posts = useSelector((state) => state.posts)
    // alert(posts)
    console.log(posts)

    return (
        <div className="flex flex-wrap gap-4">
            {posts.map((post, index) => (
                <div key={index}>
                    <Post post={post} setCurrentId={setCurrentId}/>
                </div>
            ))}
            
        </div>
    )
};

export default Posts;