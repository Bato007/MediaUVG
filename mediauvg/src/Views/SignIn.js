import React from 'react'
import { useHistory } from 'react-router-dom'

import '../Estilos/Login.css';


export default function SignIn(){
    const history = useHistory()

    // Encargado de mandar a la siguiente pantalla
    const toSignUp = () =>{
        history.push('/SignUp')
    }
    const toHome = () =>{
        history.push('/Home')
    }

    return (
        <body className="fondo">
            <div className="cuadro">
                <form  action="SignUp.js" >
                    <label>
                        <div id="titulo">
                            Swap
                        </div>
                        <div className="espaciado" >
                            <input type="text" name="usuario" placeholder="Introduce tu nombre de usuario" />
                        </div>
                                
                        <div>
                            <input type="password" name="contrasena" placeholder="Introduce tu contraseña" />
                        </div>

                        <div className="espaciado" >
                            <input type="submit" value="Log in" id="button"  onClick = {toHome} />   
                        </div>

                        <div>
                            <input type="submit" value="Sign up" id="button"  onClick = {toSignUp} />   
                        </div>
                        
                    </label> 
                </form>
            </div>
        </body>
    );
}