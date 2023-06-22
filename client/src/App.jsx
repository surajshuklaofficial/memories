import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

import {Form, Posts, Navbar } from "./components";
import { getPosts } from './actions/posts';

const App = () => {
    const [ currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [ currentId, dispatch]);
    
    return (
        <div>
            <Navbar />
            <div className="flex justify-between sm:px-40 px-2 py-4">
                <Posts setCurrentId={setCurrentId}/>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </div>
        </div>
    )
}

export default App;