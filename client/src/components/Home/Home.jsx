import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // allow us to dispatch/initiate an action
import { useNavigate, useLocation} from 'react-router-dom';

import { getPosts, getPostsBySearch } from "../../actions/posts";
import { Form, Posts } from "../index.js";
import Pagination from '../Pagination';
import Search from "../Search/Search";

// to get location
function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const Home = () => {

    const [ currentId, setCurrentId ] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get("page") || 1; // check if page have parameter 
    const searchQuery = query.get("searchQuery"); 
    const [ search, setSearch ] = useState('');
    const [ tags, setTags ] = useState([]);
    const [ tag, setTag ] = useState();
    
    // // we can dispatch using useEffect
    // useEffect(() => {
    //     dispatch(getPosts());
    // }, [currentId, dispatch]);

    const searchPost = () => {
        if (search.trim() || tags.length) {           // trim removes spaces
            dispatch(getPostsBySearch({ search, tags: tags.join(',') })); // array can't be passed through url
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);

        } else {
            navigate('/');
        }
    }

    return (
        <div className="flex lg:justify-between justify-start lg:flex-row flex-col-reverse sm:mt-2 sm:mx-16 mt-1">
            <div className="flex flex-wrap sm:mx-2 mx-auto mb-4 w-full">
                <Posts setCurrentId={setCurrentId}/>
            </div>

            <div className="flex flex-col gap-1 sm:gap-2 sm:w-[400px]">
                <Search setSearch={setSearch} setTags={setTags} tags={tags} tag={tag} setTag={setTag} searchPost={searchPost} />
                <Form currentId={currentId} setCurrentId={setCurrentId}/>

                {
                    (!searchQuery && !tags.length) && (
                        <Pagination page={page}/>
                    )
                }
                
            </div>
        </div>
    )
}

export default Home;
