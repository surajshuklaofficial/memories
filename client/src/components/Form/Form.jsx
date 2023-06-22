import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {

    const [postData, setPostData] = useState({creator: '', title: '', message: '', tags: '', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post);
    }, [currentId, post]);
    
    const handleSubmit = (e) => {
        e.preventDefault(); // to stop refresh on submit

        if (currentId) {
            dispatch(updatePost(currentId, postData))
        } else {
            dispatch(createPost(postData));
        }

        clear();
    };

    const clear = () => {
        setCurrentId(null)
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''})
    };

    return (
        <div>
            <form className="bg-white flex flex-col items-center py-4 px-2 shadow-lg gap-2 rounded-md" onSubmit={handleSubmit}>
                <h1 className="font-semibold">{currentId? 'Editing':'Creating'} a Memory</h1>
                <input className="border p-1 w-full rounded-sm shadow-lg border-stone-300" label="" value={postData.creator} placeholder="Creator" onChange={(e) => setPostData({...postData, creator: e.target.value})}/>
                <input className="border p-1 w-full rounded-sm shadow-lg border-stone-300" label="" value={postData.title} placeholder="Title" onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                <input className="border p-1 w-full rounded-sm shadow-lg border-stone-300" label="" value={postData.message} placeholder="Message" onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                <input className="border p-1 w-full rounded-sm shadow-lg border-stone-300" label="" value={postData.tags} placeholder="Tags" onChange={(e) => setPostData({...postData, tags: e.target.value})}/>
                <input className="" type="file" label="" value="" placeholder="Creator" onChange={(e) => setPostData({...postData, creator: e.target.value})}/>
                <button className="bg-blue-700 w-full rounded-sm p-1 text-white" type="submit">SUBMIT</button>
                <button className="bg-red-500 w-full rounded-sm p-1 text-white" onClick={clear} type="button">CLEAR</button>
            </form>
        </div>
    )
};

export default Form;