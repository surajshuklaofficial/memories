import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../actions/posts';

const PaginationItem = ({item}) => {

    return (
        <a className="w-10 h-10 rounded-full border flex items-center justify-center" href={`/posts?page=${item}`}>
            {item}
        </a>
    )
}

const Pagination = ({ page}) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (page) dispatch(getPosts(page));

    }, [page])    

    return (
        <div className="bg-white flex justify-between px-8 py-2 my-2 rounded-lg items-center gap-10 shadow-md">

            <FontAwesomeIcon icon={faAngleRight} style={{transform: "rotate(180deg)"}}/>
            {/* <div className='flex justify-between gap-6'>
                {numberOfPages.map((item, index) => (
                    <PaginationItem item={item} key={index}/>
                ))}
            </div> */}
            <div className='flex justify-between gap-6'>
                {(() => {
                    const items = [];
                    for (let i = 0; i < numberOfPages; i++) {
                    items.push(<PaginationItem item={i + 1} key={i + 1} />);
                    }
                    return items;
                })()}
            </div>

            <FontAwesomeIcon icon={faAngleRight}/>
        </div>
    )
}

export default  Pagination;