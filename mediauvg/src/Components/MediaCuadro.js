import React from 'react';
import '../Estilos/Login.css';
export default function AppCuadro({
    text, 
}){

    return(
        <div className = "cuadroReporte">
            <div id="tituloR">
                {text}
            </div>
        </div>
    );
}