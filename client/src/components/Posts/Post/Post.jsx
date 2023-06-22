import React from "react";
import { useDispatch } from "react-redux";

import { like, deleteIcon } from "../../../assets";
import { deletePost, likeCount } from "../../../actions/posts";

const Post = ({post, setCurrentId}) => {

    const dispatch = useDispatch();

    return (
        <div className="w-[240px] shadow-lg">
            <div className="bg-red-500 text-white h-[120px] rounded-t-lg p-2">

                <div className="flex justify-between">
                    <h2 className="text-xl">{post.creator}</h2>
                    <button onClick={() => setCurrentId(post._id)}>update</button>
                </div>
                <h5 className="text-xs">{new Date(post.createdAt).toDateString()}</h5>
            </div>  

            <div className="h-[220px] bg-white rounded-b-lg justify-between flex flex-col">
                <div className="p-2 flex flex-col gap-4  ">
                    <h5 className="text-xs">{post.tags}</h5>

                    <div className="flex gap-2 flex-col">
                        <h1 className="text-2xl">{post.title}</h1>
                        <p>{post.message}</p>
                    </div>
                </div>
                <div className="p-2 flex justify-between">
                    <button className="flex items-center gap-1 text-blue-700" onClick={() => dispatch(likeCount(post._id))}><img className="h-4" src={like} alt="like"/> LIKE {post.likeCount}</button>
                    <button className="flex items-center gap-1 text-blue-700" onClick={() => dispatch(deletePost(post._id))}><img className="h-[18px]" src={deleteIcon} alt="delete"/>DELETE</button>
                </div>
            </div>
        </div>
    )
};

export default Post;