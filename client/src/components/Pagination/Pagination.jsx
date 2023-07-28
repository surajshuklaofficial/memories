import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { getPosts } from '../../actions/posts';

const PaginationItem = ({item, pageSelected, setPageSelected}) => {

    return (
        <div className=''>
            <Link className={`w-10 h-10 rounded-full border flex items-center justify-center ${pageSelected == item && 'bg-slate-600'}`} to={`/posts?page=${item}`} onClick={(() => setPageSelected(item))}>
                {item}
            </Link>
        </div>
    )
}

const Pagination = ({ page}) => {
    const { numberOfPages } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const [ pageSelected, setPageSelected ] = useState(page);
    const navigate = useNavigate();

    useEffect(() => {
        if (pageSelected) { dispatch(getPosts(pageSelected)); navigate(`/posts?page=${pageSelected}`)}
    }, [pageSelected])

    const handleLeftClick = () => {
        if ((pageSelected - 1) > 0) setPageSelected((Number(pageSelected)-1).toString())   
    }
    
    const handleRightClick = () => {

        if (page < numberOfPages ) setPageSelected((Number(pageSelected)+1).toString())
    }

    return (
        <div className="bg-white flex justify-between border-slate-600 sm:my-4 py-2 px-4 mx-2 mb-2 rounded-lg items-center gap-10  shadow-md h-12">

            <div className='w-10 h-10 rounded-full flex justify-center items-center' onClick={handleLeftClick}>
                { (page > 1) && <FontAwesomeIcon icon={faAngleRight} style={{transform: "rotate(180deg)"}}/>}
            </div>
            {/* <div className='flex justify-between gap-6'>
                {numberOfPages.map((item, index) => (
                    <PaginationItem item={item} key={index}/>
                ))}
            </div> */}
            <div className='flex justify-between gap-6 text-black'>
                {(() => {
                    const items = [];
                    for (let i = 0; i < numberOfPages; i++) {
                    items.push(<PaginationItem item={i + 1} key={i + 1} pageSelected={pageSelected} setPageSelected={setPageSelected}/>);
                    }
                    return items;
                })()}
            </div>
            
            <div onClick={handleRightClick}>
                { (page < numberOfPages) && <FontAwesomeIcon icon={faAngleRight}/> }
            </div>
        </div>
    )
}

export default  Pagination;