import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // allow us to dispatch/initiate an action

import { getPosts } from "../../actions/posts";
import { Form, Posts } from "../index.js";

const Home = () => {

    const [ currentId, setCurrentId ] = useState(null);
    const dispatch = useDispatch();

    // we can dispatch using useEffect
    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

     return (
        <div className="flex justify-between my-8 mx-32 gap-4">
            <Posts setCurrentId={setCurrentId}/>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
        </div>
    )
}

export default Home;
