import React, { useState } from "react";
import { useSelector } from "react-redux"; // to extract data from the global redux store we use useSelector

import Post from "./Post";
import CircularProgress from "../../elements/CircularProgress";

const Posts = ({setCurrentId}) => {
    const { posts, isLoading }= useSelector((state) => state.posts); // inside callback function of useSelector we get access to whole global store and we return state.posts becuase in index.js file of reducers we named it posts
    if ( !posts?.length && !isLoading) return 'No Posts';
    
    return (
        <div className="flex gap-4 flex-wrap w-full">
            { isLoading ? 
                <CircularProgress /> :
                posts.map((post) => (
                        <Post key={post._id} post={post} setCurrentId={setCurrentId} />
            ))}
        </div>
    )
}

export default Posts;