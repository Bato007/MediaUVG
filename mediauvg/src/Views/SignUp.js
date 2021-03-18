
import React from 'react'
import { useHistory } from 'react-router-dom'

import '../Login.css';

export default function SignUp() {
  const history = useHistory()

  // Para regresar al pasado
  const toSignIn = () => {
    history.push('/')
  }
 
  return (
    <div className="App">

      <body className="fondo">
        <div>
          <form className="cuadro">
            <label>
              <div id="titulo">
                Swap
              </div>
              <div>
                <input type="submit" value="Crear cuenta" id="button" onClick = {toSignIn} />   
              </div>

            </label> 
          </form>
          
        </div>
      </body>  
    </div>
  );
}