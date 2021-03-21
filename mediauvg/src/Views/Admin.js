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
    <body className="fondo">
      <div>
        <form className="cuadrop">
          <label>
            <div id="nav">    
              <div class="titulonav">
                Admin 
              </div>

              <div class="cuerporec">
                <ul>
                  <li>Nombre</li>
                  <li>Usuario</li>
                  <Button 
                    text='Administrar Canción'
                    onPress={adminSong}
                  />
                  <Button 
                    text='Administrar Album'
                    onPress={adminAlbum}
                  />
                  <Button 
                    text='Administrar Artista'
                    onPress={adminArtist}
                  />
                  <Button 
                    text='Ver Estadisticas'
                    onPress={adminstatistics}
                  />
                  <Button 
                    text='Cerrar sesion'
                    onPress={logOut}
                  />
                </ul>
              </div>  
            </div>
          </label> 
        </form>
        <Form />
      </div>
    </body> 
  );
}