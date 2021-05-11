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

  const visibilityAS = () => {
    history.push('/Admin/Visibility/AS')
  }

  const visibilityArtist = () => {
    history.push('/Admin/Visibility/Artist')
  }

  const adminstatistics = () => {
    history.push('/Admin/Reportes')
  }

  const monitores = () => {
    history.push('/Admin/Monitores')
  }

  const binnacleSet = () => {
    history.push('/Admin/Bitacora')
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
              text='Activar Album/Cancion'
              onClick={visibilityAS}
              clase="botonAdmin"
            />
            <Button 
              text='Activar Artista'
              onClick={visibilityArtist}
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
              text='Ver bitacora'
              onClick={binnacleSet}
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