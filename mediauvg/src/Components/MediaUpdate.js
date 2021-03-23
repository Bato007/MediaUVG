import React from 'react';
import './songForm.css';

export default function AppButton({
    onChange,
    placeholder,
    limit,
    type,
    value
}){
  
  const onWrite = (event) => {
    onChange(event.target.value)
  }

  return(
    <input
      className="inputAdmin" 
      maxLength={limit}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onWrite} 
    />
  )
}