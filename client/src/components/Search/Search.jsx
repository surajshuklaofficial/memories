import React, { useState } from 'react';

import ChipButtons from './ChipButtons';

const Search = ({tags, setTags, setSearch, searchPost}) => {
  const [ tag, setTag] = useState('');

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      searchPost();
    }
  }

  const addTag = (event) => {
    if (event.keyCode === 13) {
      setTags([...tags, tag]);
      setTag('');
    }
  }

  return (
    <div className='bg-white rounded-lg flex flex-col gap-1 px-4 mx-2 py-1 shadow-md border-slate-600 border'>
      <div className=' flex flex-col justify-between w-full'>
          <input className='border w-full h-14 rounded-lg p-2' type='search' name='search' placeholder='Search Memories' onKeyDown={handleKeyPress} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div className='flex flex-col justify-between'>
          <input className='border w-full h-10 rounded-lg p-2' type='search' value={tag} name='search' placeholder='Search Tags' onKeyDown={addTag} onChange={(e) => setTag(e.target.value)}/>
          <div className='flex flex-wrap gap-2 '>
            {tags.map((tag, index) => <ChipButtons key={index} tag={tag} tags={tags} setTags={setTags} setTag={setTag} searchPost={searchPost}/>)}
          </div>
      </div>
      <button className='bg-white border border-blue-700 mt-4 rounded-lg h-12 text-blue-700' onClick={searchPost}>SEARCH</button>
    </div>
  )
}

export default Search;