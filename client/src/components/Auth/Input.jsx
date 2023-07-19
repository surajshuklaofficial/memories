import React from 'react';

const Input = ({name, autofocus, type, border, required, handleChange, value}) => {
  return (
    <input className={`${border && 'border' } w-full py-2 px-2`} name={name} placeholder={`${name}${required ? '*' : ''}`} value={value} type={type} autoFocus={autofocus} required={required} onChange={handleChange}/>
  )
}

export default Input;