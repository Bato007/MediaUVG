
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import '../Estilos/Login.css';
import Button from '../Components/MediaButton'
import Input from '../Components/MediaInput'


export default function SignUp() {
  const location = useLocation()
  const history = useHistory()
  const [ nombre, setName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirm, setConfirm ] = useState('')
  const [ usuario, setUsername ] = useState('')


  const toSignIn = () => {
    const data = {
      username: usuario,
      password,
      confirm,
      name: nombre
    }
    fetch("http://localhost:3001/login/register", 
    {method: 'POST', 
    body: JSON.stringify(data), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      console.log(out)
      if (out && out.created === 'DONE') {
        history.push('/Home', { username:usuario, name:nombre, artist:false, premium:false, artistname:'' })
        setName('')
        setPassword('')
        setConfirm('')
        setUsername('')
      }
    }) 
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
            onChange={setName}
          />
        </div>

        <div>
          <Input 
            type="text"
            placeholder="Introduce tu nombre de usuario"
            limit={20}
            onChange={setUsername}
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
            onChange={setConfirm}
          />  
        </div>
        <div>
          <Button
            clase="button"
            onClick={toSignIn}
            text='Confirmar'
          /> 
        </div>
      </div>
    </div>  
  );
}