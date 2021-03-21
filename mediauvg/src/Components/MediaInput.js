import React, { useState } from 'react';
import '../Estilos/Login.css';

export default function AppButton({
    onChange,
    placeholder,
    limit,
    type
}){
  
  const onWrite = (event) => {
    onChange(event.target.value)
  }

  return(
    <input
      className="espaciado" 
      maxLength={limit}
      type={type}
      placeholder={placeholder}
      onChange={onWrite} 
    />
  )
}