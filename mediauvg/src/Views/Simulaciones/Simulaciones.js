import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Button from '../../Components/MediaButton'
import './Simulaciones.css'

export default function Simulaciones() {
  const history = useHistory()
  const [sim, setSim] = useState(0)

  const goBack = () => {
    history.goBack()
  }

  const selectSim = () => {
    switch (sim) {
      case 1:
        return (
          <div className="sim_cont">
            <div className="sim_center">
              Hola
            </div>
          </div>
        )
      case 2:
        return (
          <div className="sim_cont">
            <div className="sim_center">
              Adios
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="sim_background">
      <div className="sim_container">
        <div className="sim_title">
          Simulaciones
        </div>
        <Button
          onClick={() => setSim(1)}
          text='Tracks existentes'
          clase="sim_button"
        />
        <Button
          onClick={() => setSim(2)}
          text='Generar tracks'
          clase="sim_button"
        />
        <Button
          onClick={goBack}
          text='Atras'
          clase="sim_button"
        />
      </div>
      {selectSim()}
    </div>
  )
}