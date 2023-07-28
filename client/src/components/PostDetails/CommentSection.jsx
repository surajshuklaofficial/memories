import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';

const CommentSection = ({post}) => {

    const [ comments, setComments ] = useState(post?.comments);
    const [ comment, setComment ] = useState('');
    const dispatch = useDispatch();
    const commentsRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick   = async () => {

        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        console.log(commentsRef.current)
        if (commentsRef.current) commentsRef.current.scrollIntoView(false);
    }

    return (
        <div>
            <div className='flex justify-between gap-1 sm:flex-row flex-col-reverse'>
                <div className='sm:w-5/12 w-full sm:py-1'>
                <h3 className='text-md font-semibold'>Comments : </h3>
                <div className='overflow-y-scroll h-36 flex flex-col gap-2 py-2'>
                    {
                        comments.map((c, i) => {
                            return (
                                <div key={i} className='text-xs'>
                                    <p><strong>{c.split(': ')[0]}</strong> : {c.split(': ')[1]}</p>
                                </div>
                            )
                        })
                    }
                    <div id='abc' className='mt-10' ref={commentsRef} /> {/* anchor point */}
                </div>
                </div>
                {
                    user?.result?.name && (
                        <div className='sm:w-6/12 flex flex-col gap-2 w-full py-1'>
                            <h3 className='text-md font-semibold '>Write a Comment :</h3>
                            <textarea className='w-full border p-2 text-md' value={comment} placeholder='Comment' rows='3' onChange={(e) => setComment(e.target.value)}/>
                            <button className={`${comment? 'bg-indigo-700' : 'bg-gray-400'} w-full border h-12 text-white`} disabled={!comment} onClick={handleClick}>COMMENT</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default CommentSection;