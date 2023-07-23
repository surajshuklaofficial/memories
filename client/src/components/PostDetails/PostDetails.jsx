import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import CircularProgress from '../../elements/CircularProgress';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts) ;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const param = useParams();
    const { id } = param;

    useEffect(() => {
        dispatch(getPost(id));
    }, [id])

    useEffect(() => {
        if (post) {
          dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);

    if (!post) return null;

    const openPost = (_id) =>  {
        navigate(`/posts/${_id}`)
    };

    if (isLoading) return <div className='mx-32'><CircularProgress /></div>;

    const recommendedPosts = posts.filter(({ _id}) => _id !== post._id);
    
    return (
        <div className='mx-32 rounded-lg border px-12 py-6 shadow-lg'>
            <div className='flex gap-12 '>
                <div className='w-3/5 flex flex-col gap-2'>
                    <h1 className='text text-6xl'>{post.title}</h1>
                    <p className='text-gray-500'>{post.tags.map((tag) => `#${tag} `)}</p>
                    <p className='mb-3 mt-1'>{post.message}</p>
                    <h3 className='text-lg'>Created by: {post.name}</h3>
                    <p className="text-sm text-gray-500 mb-6">{moment(post.createdAt).fromNow()}</p>

                    <hr />
                    <h2 className='my-2'>Realtime Chat - coming soon</h2>
                    <hr />
                    <CommentSection post={post} />
                    <hr />
                </div>
                <img className='w-2/5 rounded-3xl shadow-lg max-h-[40rem]' src={post.selectedFile} alt='' />
            </div>
            {recommendedPosts.length && (
                <div>
                    <h1>You might also like:</h1>
                    <hr />
                        <div className='flex gap-2 justify-between m-4'>
                            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                                <div key={_id} className='flex flex-col gap-2 border rounded-md p-4 shadow-lg' onClick={() => openPost(_id)}>
                                    <h1 className='text-xl'>{title}</h1>
                                    <h4 className=''>Created By : <span className='text-gray-500'>{name}</span></h4>
                                    <p className='text-gray-500'>{message}</p>
                                    <h6>Likes: {likes.length}</h6>
                                    <img className='w-60 h-32' src={selectedFile}></img>
                                </div>
                            ))}
                        </div>
                </div>
            )}
        </div>
    )
}

export default PostDetails;