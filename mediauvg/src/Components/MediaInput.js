import React from 'react';
import '../Estilos/Login.css';

export default function AppButton({
    handleChange,
    placeholder,
    limit,
    type
}){

    return(
      <input
        className="espaciado" 
        maxLength={limit}
        type={type} 
        name="usuario" 
        placeholder={placeholder}
        onChange={handleChange} 
      />
    )
}