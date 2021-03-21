import React from 'react';

export default function AppButton({
    onClick,
    text  
}){

    return(
        <button 
        className = 'button espaciado'
        onClick={onClick}>
          {text}
        </button>
    );
}