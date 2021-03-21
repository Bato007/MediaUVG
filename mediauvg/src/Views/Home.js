
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import '../Estilos/Home.css';
import Button from '../Components/MediaButton'
import Input from '../Components/MediaInput'

export default function Home() {
  const history = useHistory()
  const [ search, setsearch ] = useState('')
  // Esta onda me tira error :/
  const location = useLocation()
  // const { admin, name, password, 
  //   playback, premium, username } = location.state

  // Para regresar al pasado
  const logOut = () => {
    history.push('/')
  }
  const toPlayList = () =>{
    history.push('/PlayLists')
  }

 
  return (
    <div className="fondo">
      <div className="cuadrop">
        <div id="nav">    
          <div class="titulonav">
            Perfil 
          </div>

          <div class="cuerporec">
            <ul>
              {/* <li>{name}</li> */}
              {/* <li>{username}</li> */}
              <Button
                onClick={toPlayList}
                text='Listas de reproduccion'
                clase="botonMenu"
              /> 
              <Button
                onClick={''}
                text='Ser artista'
                clase="botonMenu"
              />
              <Button
                onClick={''}
                text='Subscribirse'
                clase="botonMenu"
              />
              <Input 
                type="text"
                placeholder="Buscar"
                limit={20}
                onChange={setsearch}
              /> 

              <Button
                onClick={logOut}
                text='Cerrar sesion'
                clase="botonMenu"
              />
            </ul>
          </div>  
        </div>
      </div>
    </div> 
  );
}