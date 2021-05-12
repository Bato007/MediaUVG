/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './visibilityAS.css'
import VisibilitySongs from '../../Components/Admin/ActiveSongs/activeSongs'
import VisibilityAlbums from '../../Components/Admin/ActiveAlbum/activeAlbum'
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

  const selectStats = () => {
    switch (stat) {
      case 1:
        return (
          <VisibilitySongs username={username} />
        )
      case 2:
        return (
          <VisibilityAlbums username={username} />
        )
      default:
        return (<div></div>)
    }
  }

  return (
      <div className="stats_back">
        <div className="stats_cont">
          <div className="stats_title">
            Estadisticas
          </div>
          <Button
            onClick={() => setStat(1)}
            text='Visibilidad Cancion'
            clase="stats_boton"
          /> 
          <Button
            onClick={() => setStat(2)}
            text='Visibilidad Album'
            clase="stats_boton"
          />
          <Button
            onClick={goBack}
            text='Atras'
            clase="stats_boton"
          />
        </div>
        <div className="stats_container">
          <div className="stats_center">
            {selectStats()}
          </div>
        </div>
      </div> 
  );
}