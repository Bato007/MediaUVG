
import React from 'react'
import { useHistory } from 'react-router-dom'

import '../Estilos/Login.css';


export default function SignUp() {
  const history = useHistory()

  // Para regresar al pasado
  const toSignIn = () => {
    history.push('/Home')
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
                <input type="text" name="usuario" placeholder="Introduce tu nombre de usuario"  />   
              </div>

              <div>
                <input type="text" name="nombre" placeholder="Introduce tu nombre"  />   
              </div>

              <div>
                <input type="password" name="contra" placeholder="Introduce tu contraseña"  />   
              </div>

              <div>
                <input type="password" name="contra" placeholder="Verifica tu contraseña"  />   
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