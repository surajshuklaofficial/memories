import React, { useState, useEffect } from "react";
import Filebase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createPost, updatePost } from '../../actions/posts';


const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData ] = useState({title: '', message: '', tags: '', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.posts.find((post) => post._id === currentId) : null);
    const dispatch = useDispatch(); // this is used to dispatch an action; basically it is responsible to initiate the createPost function present in action
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // to avoid refresh

        if (currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        } else {
            dispatch(createPost( {...postData, name: user?.result?.name}, navigate ));
        }
        clear();
    }

    if (!user?.result?.name) {
        return (
            <div className="bg-white h-24 rounded-lg py-2 px-4 text-center text-xl shadow-md mx-2">
                Please Sign In to create your own memories and like other's memories
            </div>
        )
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({title: '', message: '', tags: '', selectedFile: ''});
    }

    return (
        <div>
            <form className="bg-white flex flex-col items-center justify-between p-4 mx-2 shadow-lg gap-2 rounded-md border-slate-600 border mb-1" onSubmit={handleSubmit}>
                <h1 className="font-semibold">{ (currentId? 'Editing': 'Creating')} a Memory</h1>
                <input className="border p-1 h-10 w-full rounded-lg px-2 py-1 shadow-lg border-stone-300" value={postData.title} placeholder="Title" onChange={(e) => setPostData({...postData, title: e.target.value})} />
                <textarea className="border p-1 h-18 w-full rounded-lg px-2 py-1 shadow-lg border-stone-300" value={postData.message} placeholder="Message" onChange={(e) => setPostData({...postData, message: e.target.value})} />
                <input className="border p-1 h-10 w-full rounded-lg px-42py-1 shadow-lg border-stone-300" value={postData.tags} placeholder="Tags" onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
                <Filebase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})} />
                <button className="bg-blue-700 w-full rounded-md h-10 p-1 text-white shadow-lg" type="submit">SUBMIT</button>
                <button className="bg-red-700 w-full rounded-md h-10 p-1 text-white shadow-lg" type="button" onClick={clear}>CLEAR</button>
            </form>
        </div>
    )
}

export default Form;