import React, { useState } from 'react'
import { useHistory } from 'react-router'

import Update from '../../Components/MediaUpdate'
import Button from '../../Components/MediaButton'
import './assignMonitor.css'

export default function SongFomr({ form }) {
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [monitor, setMonitor] = useState('')
  // ASIGNAR A UN USUARIO UN MONITOR
  const goBack = () => {
    history.goBack()
  }
  
  const assignMonitor = () => {
    setMonitor('')
    setUsername('')
    const data = {
      username,
      monitor
    } 
    fetch("http://localhost:3001/monitors/assign",
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then((res) => res.json())
      .catch((error) => console.error('Error', error))
      .then((out) => {
        if (out) {
          let resp = out[0]
          if (resp === undefined) resp = out
          switch (resp.status) {
            case 'ERROR 902':
              return alert('Usuario o monitor incorrectos')
            default:
              return alert('Se ha asignado con exito')
          }
        }
      })
  }


  return (
    <div className="assign_monitor_container">
      <div className="assign_monitor_square">
        <div className="assign_monitor_title">Asignar monitor</div>
        <div>
          <Update
            onChange={setUsername}
            placeholder="Ingrese usuario"
            limit={20}
            value={username}
            type="text"   
          />
          <Update
            onChange={setMonitor}
            placeholder="Ingrese tipo monitor"
            limit={20}
            value={monitor}
            type="text"
          />
        </div>
        <div>
          <Button
            onClick={assignMonitor}
            clase="botonAsignar"
            text="Asignar"
          />
          <Button
            onClick={goBack}
            clase="botonAsignar"
            text="Atrás"
          />
        </div>
    </div>
  </div>
  )

}