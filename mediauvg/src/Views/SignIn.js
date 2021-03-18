import React from 'react'
import { useHistory } from 'react-router-dom'

import '../Login.css';

export default function SignIn(){
    const history = useHistory()

    // Encargado de mandar a la siguiente pantalla
    const toSignUp = () =>{
        history.push('/SignUp')
    }

    return (
        <div className="App">    
            <body className="fondo">
                <div className="cuadro">
                    <form  action="SignUp.js" >
                        <label>
                            <div id="titulo">
                                Swap
                            </div>
                            <div >
                                <input type="text" name="usuario" placeholder="Introduce tu nombre de usuario" />
                            </div>
                                
                            <div>
                                <input type="password" name="contrasena" placeholder="Introduce tu contraseña" />
                            </div>

                            <div>
                                <input type="submit" value="Log in" id="button" />   
                            </div>
                                
                            <button renderAs="button" onClick = {toSignUp} id="button">
                                <span>Sign Up</span>
                            </button> 
                        </label> 
                    </form>
                </div>
            </body>
        </div>
    );
}