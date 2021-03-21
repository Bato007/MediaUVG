
import React from 'react'
import { useHistory } from 'react-router-dom'

import { useInput } from '../hooks/hook-input';

import '../Estilos/Login.css';


export default function SignUp() {
  const history = useHistory()
  const { value:nombre, bind:bindnombre, reset:resetnombre } = useInput('');
  const { value:usuario, bind:bindusuario, reset:resetusuario } = useInput('');
  const { value:contrasena, bind:bindcontrasena, reset:resetcontrasena } = useInput('');
  const { value:conficontra, bind:bindconficontra, reset:resetconficontra } = useInput('');
  
  const handleSubmit = (evt) => {
      evt.preventDefault();
      console.log('que onda hueco', nombre, usuario, contrasena, conficontra)
      resetnombre();
      resetusuario();
      resetcontrasena();
      resetconficontra();
  }

  // Para regresar al pasado
  const toSignIn = () => {
    history.push('/Home')
  }
 
  return (
    

  <body className="fondo">
    <div>
      <form onSubmit={handleSubmit} className="cuadro">
        <label>
          <div id="titulo">
            Swap
          </div>

          <div>
            <input type="text" {...bindnombre} placeholder="Introduce tu nombre" name="nombre" />
          </div>
        </label>

        <label>
          <div>
            <input type="text" {...bindusuario} name="usuario" placeholder="Introduce tu nombre de usuario"  />   
          </div>
        </label>

        <label>
          <div>
            <input type="password" {...bindcontrasena} name="contra" placeholder="Introduce tu contraseña"  />   
          </div>
        </label>

        <label>
          <div>
            <input type="password" {...bindconficontra} name="contra" placeholder="Verifica tu contraseña"  />   
          </div>
        </label>

        <div>
          <input type="submit" value="Confirmar" id="button"  />   
        </div>

        <div>
          <input type="submit" value="Entrar" id="button"  onClick = {toSignIn}/>   
        </div>
      </form>
    </div>
  </body>  
  );
}