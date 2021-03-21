import React from 'react';

export default function AppButton({
    onPress,
    text  
}){

    return(
        <button 
        className = 'button espaciado'
        onClick={onPress}>
          {text}
        </button>
    );
}