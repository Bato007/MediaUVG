import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../Components/MediaButton'
import Form from '../Components/Admin/FormManager'
import '../Estilos/Home.css';

export default function Admin() {
  const history = useHistory()
  const [ form, setForm ] = useState('')

  // Para regresar al pasado
  const logOut = () => {
    history.push('/')
  }

  // Para cambiar de form 
  const adminSong = () => {
    setForm('song')
  }

  const adminAlbum = () => {
    setForm('album')
  }

  const adminArtist = () => {
    setForm('artist')
  }

  const adminstatistics = () => {
    setForm('statistics')
  }

  return (
    <div className="fondo">
      <div className="cuadrop">
        <div id="nav">    
          <div class="titulonav">
            Admin 
          </div>

          <div class="cuerporec">
            <ul>
              <li>Nombre</li>
              <li>Usuario</li>
              <Button 
                clase="button"
                text='Administrar Canción'
                onPress={adminSong}
              />
              <Button 
                clase="button"
                text='Administrar Album'
                onPress={adminAlbum}
              />
              <Button 
                clase="button"
                text='Administrar Artista'
                onPress={adminArtist}
              />
              <Button
                clase="button" 
                text='Ver Estadisticas'
                onPress={adminstatistics}
              />
              <Button
                clase="button" 
                text='Cerrar sesion'
                onPress={logOut}
              />
            </ul>
          </div>  
        </div>
      </div>
    </div> 
  );
}