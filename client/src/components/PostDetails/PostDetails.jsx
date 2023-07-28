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
        <div className='mx-auto my-1 rounded-lg border sm:px-8 px-2 py-2 shadow-lg border-gray-700 w-[90%] sm:h-[87vh]'>
            <div className='sm:flex-row flex flex-col-reverse gap-6 h-3/5'>
                <div className='sm:w-3/5 w-full flex flex-col gap-1'>
                    <h1 className='text text-2xl font-bold'>{post.title}</h1>
                    <p className='text-gray-500 text-xs'>{post.tags.map((tag) => `#${tag} `)}</p>
                    <p className='mt-1'>{post.message}</p>
                    <h3 className='text-sm font-semibold'>Created by: {post.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{moment(post.createdAt).fromNow()}</p>

                    <hr className='border-gray-700'/>
                    <h2 className='my-1'>Realtime Chat - coming soon</h2>
                    <hr className='border-gray-700' />
                    <CommentSection post={post} />
                    <hr className='border-gray-700' />
                </div>
                <div className='sm:w-2/5 w-full flex justify-center items-center'>
                    <img className='rounded-3xl shadow-lg aspect-[4/3] object-cover' src={post.selectedFile} alt='' />
                </div>
            </div>
            {recommendedPosts.length ? (
                <div className='border border-gray-300 rounded-b-md px-4 py-1 mt-2'>
                    <h1 className='font-semibold'>You might also like:</h1>
                    <hr className='border-gray-400'/>
                        <div className='flex gap-2 justify-between m-2'>
                            {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id }) => (
                                <div key={_id} className='flex flex-col gap-2 rounded-md sm:p-2 p-1 shadow-lg  border border-gray-500 sm:w-[180px]' onClick={() => openPost(_id)}>
                                    <h1 className='text-md font-semibold'>{title}</h1>
                                    <h4 className='text-xs'>Created By : <span className='text-gray-500'>{name}</span></h4>
                                    <p className='text-gray-500 text-xs'>{message}</p>
                                    <h6 className='text-[0.6rem]'>Likes: {likes.length}</h6>
                                    <img className='sm:w-32 sm:h-16 h-32 2-60' src={selectedFile}></img>
                                </div>
                            ))}
                        </div>
                </div>
            ) : null}
        </div>
    )
}

export default PostDetails;