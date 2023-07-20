import React from 'react'

const ChipButtons = ({tag, tags, setTag, setTags, searchPost}) => {

  const removeTag = (event) => {
    setTags(tags.filter(t => t !== tag));
    setTag('');
  }

  return (
    <div className="center relative inline-block select-none whitespace-nowrap rounded-full bg-gradient-to-tr from-gray-500 to-gray-400 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white" data-dismissible="chip" >
        <div className="mr-5 mt-px">{tag}</div>
        <div className="absolute top-1 right-1 mx-px mt-[0.5px] w-max rounded-full bg-black transition-colors hover:bg-gray-600" >
        <div role="button" className="h-5 w-5 p-1" onClick={removeTag}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
            >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            ></path>
            </svg>
        </div>
        </div>
    </div>
  )
}

export default ChipButtons;