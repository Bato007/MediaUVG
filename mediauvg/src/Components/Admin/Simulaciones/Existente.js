import React, { useState } from 'react'
import Button from '../../../Components/MediaButton'
import './Generar.css'

export default function Generar() {
  const [date, setDate] = useState('')
  const [tracks, setTracks] = useState('')
  const [reproductions, setReproductions] = useState('')

  const sendInfo = () => {
    const data = {
      date: date,
      tracks: tracks,
      reproductions: reproductions
    }

    fetch('http://localhost:3001/simulation/play',
    {method: 'POST',
    body: JSON.stringify(data),
    headers:{'Content-type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) => console.error('Error', error))
    .then((out) => {
      console.log(out)
    })
  }

  return (
    <div className="gen_container">
      <div className="input_container">
        <div className="gen_title">
          Fecha
        </div>
        <input type="date" className="date_input" onChange={(event) => setDate(event.target.value)} />
      </div>
      <div className="input_container">
        <div className="gen_title">
          Tracks
        </div>
        <input type="number" onChange={(event) => setTracks(event.target.value)} className="num_input" />
      </div>
      <div className="input_container">
        <div className="gen_title">
          Reproduciones
        </div>
        <input type="number" onChange={(event) => setReproductions(event.target.value)} className="num_input" />
      </div>
      <Button
        onClick={sendInfo}
        text= "Buscar"
        clase= "gen_btn"
      />
    </div>
  )
}