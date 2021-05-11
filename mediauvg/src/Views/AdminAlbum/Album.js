/* eslint-disable array-callback-return */
import React from 'react'
import { useHistory} from 'react-router-dom'

import './Album.css'
import Album from '../../Components/Admin/AlbumForm'
import Button from '../../Components/MediaButton'

export default function VisibilityAS() {
  const history = useHistory()
  // Para regresar al pasado
  const goBack = () => {
    history.goBack()
  }


  return (
      <div className="album_back">
        <div className="album_navbar">
          <Button
            onClick={goBack}
            text='Atras'
            clase="album_boton"
          />
          <div class="album_title">
            Editar albumes
            
          </div>
        </div>
        <div className="album_position">
        <Album />
        </div>
      </div> 
  );
}
