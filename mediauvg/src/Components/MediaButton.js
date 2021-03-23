import React from 'react';

export default function AppButton({
    onClick,
    text,
    clase  
}){

    return(
        <button 
        className = {clase} 
        onClick={onClick}
        >
          {text}
        </button>
    );
}