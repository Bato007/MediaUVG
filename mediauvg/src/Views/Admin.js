import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Button from '../Components/MediaButton'
import Form from '../Components/Admin/FormManager'
import '../Estilos/Admin.css'

export default function Admin() {
  const history = useHistory()
  const location = useLocation()

  const [ form, setForm ] = useState('')
  // Para regresar al pasado
  const logOut = () => {
    history.push('/')
  }

  const adminAlbum = () => {
    history.push('/Admin/EditAlbumArtist', location.state)
  }

  const visibilityAS = () => {
    history.push('/Admin/Visibility/AS', location.state)
  }

  const visibilityArtist = () => {
    history.push('/Admin/Visibility/Artist', location.state)
  }

  const adminstatistics = () => {
    history.push('/Admin/Reportes', location.state)
  }

  const monitores = () => {
    history.push('/Admin/Monitores', location.state)
  }

  const assignMonitores = () => {
    history.push('/Admin/Monitores/Assign')
  }

  const binnacleSet = () => {
    history.push('/Admin/Bitacora', location.state)
  }

  return (
    <div className="fondoP">
        <div id="titulo">
          Swap Admin 
        </div>

        <div id="navegador">
            
          <ul>
            <Button 
              text='Editar Album/Cancion'
              onClick={adminAlbum}
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
              text='Crear Monitores'
              onClick={monitores}
              clase="botonAdmin"
            />
            <Button 
              text='Asignar Monitor'
              onClick={assignMonitores}
              clase="botonAdmin"
            />
            <Button 
              text='Ver Estadisticas'
              onClick={adminstatistics}
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