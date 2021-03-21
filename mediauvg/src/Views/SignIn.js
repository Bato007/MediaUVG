import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

// Imporatar componentes
import Button from '../Components/MediaButton'
import Input from '../Components/MediaInput'

import '../Estilos/Login.css';


export default function SignIn(){
  const history = useHistory()
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  // Encargado de mandar a la siguiente pantalla
  const toSignUp = () =>{
    history.push('/SignUp')
  }

  const toHome = () =>{
    console.log(username)
      const data = {
        username,
        password
      }
      fetch("http://localhost:3001/login/verify", 
      {method: 'POST', 
      body: JSON.stringify(data), 
      headers:{'Content-Type': 'application/json'}})
      .then((res) => res.json())
      .catch((error) =>  console.error('Error', error))
      .then((out) => {
        const resp = out[0]
        switch (resp.username) {
          case 'ERROR 101':
            console.log('Tirar error no existe user')
            break
          case 'ERROR 102':
            console.log('Tirar error contraseñas no coinciden')
            break
          default:
            if (resp.admin) history.push('/Admin', out[0])
            else if (resp.premium) history.push('/Home', out[0])
            else history.push('/Home', out[0])
            break
        }
      })
  }

  return (
    <div>
      <div id="titulo">
      Swap
      </div>
      <Input 
        type="text"
        placeholder="Introduce tu nombre de usuario"
        limit={20}
        onChange={setUsername}
      />
      <Input
        type='password'
        placeholder='Introduzca su contraseña'
        limit={20}
        onChange={setPassword}
      />
      <Button 
        onClick={toHome} 
        text='Log In'
      />
      <Button
        onClick={toSignUp}
        text='Sign Up'
      />
    </div>
  );
}