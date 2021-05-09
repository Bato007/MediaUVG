import React, {useState} from 'react'

import './topSongs.css'
import MediaUpdate from '../../MediaInput'
import MediaButton from '../../MediaButton'

export default function TopGenres() {
  const [data, setData] = useState([])
  const [flag, setFlag] = useState(false)
  const [author, setAuthor] = useState('')
  const [numSong, setNumSong] = useState(1)

  // Obtiene las estadisticas
  const getStats = () => {
    fetch("http://localhost:3001/stats/top_songs", {
      method: 'POST',
      body: JSON.stringify({ author, numSong }), 
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      setData(out)
    })
    setFlag(true)
  }

  const getChart = () => {
    if (flag) {
      return (
        <div className="top_reports">
          <div key={1} className="top_info header">
            <div className="top_item">Cancion</div>
            <div className="top_item">Album</div>
            <div className="top_item">Cantidad de Plays</div>
          </div>
          {data.map((value) => {
            const stylee = value.active ? "top_info active" : "top_info inactive"

            return (
              <div key={value.songid} className={stylee}>
                <div className="top_item">
                  {value.songname}
                </div>
                <div className="top_item">{value.albumname}</div>
                <div className="top_item">{value.timesplayed}</div>
              </div>
            )
          })}
        </div>
      )
    } 
    return (
      <div></div>
    )
  }
  return (
    <div className="week_container">
      <div className="week_title">
        Top Canciones
      </div>
      <MediaUpdate
          value={author}
          type="text"
          placeholder="Autor"
          limit={10}
          onChange={setAuthor}
      />
      <MediaUpdate
          value={numSong}
          type="number"
          placeholder="Cantidad Canciones"
          limit={10}
          onChange={setNumSong}
      />
      <MediaButton 
        onClick={getStats}
        text='Obtener Valores'
        clase="week_button"
      />
      {getChart()}
    </div>
  );
}