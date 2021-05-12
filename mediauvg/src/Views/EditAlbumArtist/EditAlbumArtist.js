/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './EditAlbumArtist.css'
import Album from '../../Views/AdminAlbum/Album'
import Song from '../../Components/Admin/EditSong/EditSong'
import Button from '../../Components/MediaButton'

export default function VisibilityAS() {
  const history = useHistory()
  const location = useLocation()

  const [stat, setStat] = useState(0)
  const { username } = location.state

  // Para regresar al pasado
  const goBack = () => {
    history.goBack()
  }

  const selectEdits = () => {
    switch (stat) {
      case 1:
        return (
          <Album username={username} />
        )
      case 3:
          return (
          <Song username={username} />
      )
      default:
        return (<div></div>)
    }
  }

  return (
      <div className="edits_back">
        <div className="edits_cont">
          <div className="edits_title">
            Album/Cancion 
          </div>
          <Button
            onClick={() => setStat(1)}
            text='Editar Album'
            clase="edits_boton"
          />
          <Button
            onClick={() => setStat(3)}
            text='Editar Cancion'
            clase="edits_boton"
          />
          <Button
            onClick={goBack}
            text='Atras'
            clase="edits_boton"
          />
        </div>
        <div className="edits_container">
          <div className="edits_center">
            {selectEdits()}
          </div>
        </div>
      </div> 
  );
}