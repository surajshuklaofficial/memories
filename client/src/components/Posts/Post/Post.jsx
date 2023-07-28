import React, { useState } from "react";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faThumbsUp as SolidThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as RegularThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { useNavigate} from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId, setPosts }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);

    const userId = user?.result?.sub || user?.result?._id;
    const hasLikedPost = post.likes.find((like) => like === userId);

    const backgroundStyle = {
        backgroundImage: `url(${post.selectedFile || 'https://picsum.photos/200/300'})`,
    };

    const handleLike = async (e) => {
        dispatch(likePost(post._id));
        
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId))
        } else {
            setLikes([ ...post.likes, userId]);
            
        }

    }

    const Likes = () => {
        if (likes.length > 0) {
            console.log('h4',likes)
            return hasLikedPost ? (
                <><FontAwesomeIcon icon={SolidThumbsUp} style={{color: `${user ? '#1f68e5' : '#1f68e56e'}`}}/>&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's': ''}`}</>
            ) : (
                <><FontAwesomeIcon icon={RegularThumbsUp} style={{color: `${user ? '#1f68e5' : '#1f68e56e'}`}}/>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes' }</>        
            ) 
        }

        return <><FontAwesomeIcon icon={RegularThumbsUp} style={{color: `${user ? '#1f68e5' : '#1f68e56e'}`}}/>&nbsp;Like</>;
    }

    const openPost  = (event) =>  {
        navigate(`/posts/${post._id}`);
        
    }

    const handleDelete = () => {
        dispatch(deletePost(post._id));
        setPosts()
    }

    return (
        <div className="bg-white sm:w-[23%] w-full mx-2 sm:mx-0 sm:max-h-72 h-96 first-letter:rounded-lg break-words shadow-md aspect-[3/4] border">
            <div className="h-1/2 px-4 py-2 flex justify-between rounded-t-lg text-white bg-cover" style={backgroundStyle} onClick={openPost}>
                <div className="">
                    <h2 className="text-md font-semibold">{post.name}</h2>
                    <p className="text-[0.6rem]">{moment(post.createdAt).fromNow()}</p>
                </div>

                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <FontAwesomeIcon icon={faEllipsis} style={{color: "white"}} onClick={(e) => {e.stopPropagation(); setCurrentId(post._id)}}/>
                )}

                {/* {   !p ? 
                    <FontAwesomeIcon icon={faEllipsis} style={{color: "white"}} onClick={() => setP(!p)}/> :
                    <FontAwesomeIcon icon={faCircle} style={{color: "white"}} onClick={() => setP(!p)}/>
                } */}

            </div>
            <div className="flex flex-col justify-between h-1/2 py-2 px-1">
                <div>
                <p className="text-gray-500 text-xs">{post.tags.map((tag) => `#${tag} `)}</p>

                <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-bold">{post.title}</h1>
                    <p className="text-gray-500 h-12 overflow-y-auto text-xs">{post.message}</p>
                </div>
                </div>

                <div className="flex justify-between text-xs">
                <button className={`flex gap-1 items-center text-${user ? ['#1f68e5'] : ['#1f68e56e']}]`} disabled={!user?.result} onClick={handleLike}>
                    <Likes />
                </button>
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <button className="flex gap-1 items-center text-red-600" onClick={() => dispatch(handleDelete)}>
                        <FontAwesomeIcon icon={faTrash} style={{color: "red"}} />
                        DELETE
                    </button>
                )}
                </div>
            </div>
        </div>
    );
};

export default Post;
