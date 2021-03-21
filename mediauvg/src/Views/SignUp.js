
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import '../Estilos/Login.css';
import Button from '../Components/MediaButton'
import Input from '../Components/MediaInput'


export default function SignUp() {
  const history = useHistory()
  const [ nombre, setNombre ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ passwordR, setPasswordR ] = useState('')
  const [ usuario, setUsuario ] = useState('')

  

  // Para regresar al pasado
  const toSignIn = () => {
    history.push('/Home')
  }
 
  return (
    <div className="fondo">
      <div className="cuadro">
        <div id="titulo">
          Swap
        </div>

        <div>
          <Input 
            type="text"
            placeholder="Introduce tu nombre"
            limit={20}
            onChange={setNombre}
          />
        </div>

        <div>
          <Input 
            type="text"
            placeholder="Introduce tu nombre de usuario"
            limit={20}
            onChange={setUsuario}
          /> 
        </div>

        <div>
          <Input 
            type="password"
            placeholder="Introduce tu contraseña"
            limit={20}
            onChange={setPassword}
          />   
        </div>

        <div>
          <Input 
            type="password"
            placeholder="Verifica tu contraseña"
            limit={20}
            onChange={setPasswordR}
          />  
        </div>

        {/* <div>
          <Button
            onClick={handleSubmit}
            text='Confirmar'
          />  
        </div> */}

        <div>
          <Button
            clase="button"
            onClick={toSignIn}
            text='Entrar'
          /> 
        </div>
      </div>
    </div>  
  );
}