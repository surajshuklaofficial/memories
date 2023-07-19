import React from "react";
import moment from 'moment';
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faThumbsUp as SolidThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as RegularThumbsUp } from '@fortawesome/free-regular-svg-icons';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    // const [p, setP] = useState(false);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const backgroundStyle = {
        backgroundImage: `url(${post.selectedFile})`,
    };

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.sub || user?.result?._id)) ? (
                <><FontAwesomeIcon icon={SolidThumbsUp} style={{color: `${user ? '#1f68e5' : '#1f68e56e'}`}}/>&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's': ''}`}</>
            ) : (
                <><FontAwesomeIcon icon={RegularThumbsUp} style={{color: `${user ? '#1f68e5' : '#1f68e56e'}`}}/>&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes' }</>        
            ) 
        }

        return <><FontAwesomeIcon icon={RegularThumbsUp} style={{color: `${user ? '#1f68e5' : '#1f68e56e'}`}}/>&nbsp;Like</>;
    }

    return (
        <div className="bg-white h-[25rem] w-80 rounded-lg break-words">
        <div className="h-2/5 px-4 py-2 flex justify-between rounded-t-lg text-white bg-cover" style={backgroundStyle}>
            <div className="">
                <h2 className="text-xl font-semibold">{post.name}</h2>
                <p className="text-sm">{moment(post.createdAt).fromNow()}</p>
            </div>

            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                <FontAwesomeIcon icon={faEllipsis} style={{color: "white"}} onClick={() => setCurrentId(post._id)}/>
            )}

            {/* {   !p ? 
                <FontAwesomeIcon icon={faEllipsis} style={{color: "white"}} onClick={() => setP(!p)}/> :
                <FontAwesomeIcon icon={faCircle} style={{color: "white"}} onClick={() => setP(!p)}/>
            } */}

        </div>
        <div className="flex flex-col justify-between h-3/5 mx-4 my-2 py-4">
            <div>
            <p className="text-gray-500">{post.tags.map((tags) => `#${tags} `)}</p>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <p className="text-gray-500">{post.message}</p>
            </div>
            </div>

            <div className="flex justify-between">
            <button className={`flex gap-1 items-center text-${user ? ['#1f68e5'] : ['#1f68e56e']}]`} disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                <Likes />
            </button>
            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                <button className="flex gap-1 items-center text-[#1f68e5]" onClick={() => dispatch(deletePost(post._id))}>
                    <FontAwesomeIcon icon={faTrash} style={{color: "#1f68e5"}} />
                    DELETE
                </button>
            )}
            </div>
        </div>
        </div>
    );
};

export default Post;
