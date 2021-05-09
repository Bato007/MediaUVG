import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Button from '../Components/MediaButton'
import Form from '../Components/Admin/FormManager'
import '../Estilos/Admin.css'

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

  const monitores = () => {
    setForm('monitores')
  }

  return (
    <div className="fondoP">
        <div id="titulo">
          Swap Admin 
        </div>

        <div id="navegador">
            
          <ul>
            
            <Button 
              text='Administrar Canción'
              onClick={adminSong}
              clase="botonAdmin"
            />
            <Button 
              text='Administrar Album'
              onClick={adminAlbum}
              clase="botonAdmin"
            />
            <Button 
              text='Administrar Artista'
              onClick={adminArtist}
              clase="botonAdmin"
            />
            <Button 
              text='Ver Estadisticas'
              onClick={adminstatistics}
              clase="botonAdmin"
            />
            <Button 
              text='Monitores'
              onClick={monitores}
              clase="botonAdmin"
            />
            <Button 
              text='Cerrar sesion'
              onClick={logOut}
              clase="botonAdmin"
            />
          </ul>
        </div>  
      
      <Form 
        form={form}
      />
    </div>
  );
}