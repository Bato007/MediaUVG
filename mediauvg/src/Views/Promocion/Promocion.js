import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Button from '../../Components/MediaButton'
import './Promocion.css'
import MediaUpdate from '../../Components/MediaUpdate'
import MediaButton from '../../Components/MediaButton'

export default function Promocion() {
  const history = useHistory()
  const [date, setDate] = useState('')
  const [prom, setProm] = useState(0)

  const goBack = () => {
    history.goBack()
  }


    // Obtiene las estadisticas
  const getDay = () => {
    //console.log("fecha",date)
    if (date !== '' ) {
      
      const data = {
        date: date,
      }
      console.log("fecha",data)
      fetch('http://localhost:3001/mongo/migrate',
      {method: 'POST',
      body: JSON.stringify(data),
      headers:{'Content-type': 'application/json'}})
      .then((res) => res.json())
      .catch((error) => console.error('Error', error))
      .then((out) => {
        console.log(out)
      })
    } 
    setProm(4)
    setDate('')
  }
    // Obtiene las estadisticas
    const getByDate = () => {
      //console.log("fecha",date)
      if (date !== '' ) {
        
        const data = {
          date: date,
        }
        console.log("fecha",data)
        fetch('http://localhost:3001/mongo/migrate/from',
        {method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-type': 'application/json'}})
        .then((res) => res.json())
        .catch((error) => console.error('Error', error))
        .then((out) => {
          console.log(out)
        })
      } 
      setProm(4)
      setDate('')
    }
  const selectProm = () => {
    switch (prom) {
        case 1:
            return (
                <div className="prom_container">
                    <div className="prom_title">
                    Solo un dia
                    </div>
                    <div className="prom_temp">
                        <MediaUpdate
                            value={date}
                            type="text"
                            placeholder="Dia: YYYY-MM-DD"
                            limit={10}
                            onChange={setDate}
                        />
                    </div>
                    <MediaButton 
                        onClick={getDay}
                        text='Generar'
                        clase="prom_button"
                    />
          </div>
            )
        case 2:
            return (
                <div className="prom_container">
                    <div className="prom_title">
                    De esta fecha hacia atras
                    </div>
                    <div className="prom_temp">
                        <MediaUpdate
                            value={date}
                            type="text"
                            placeholder="Hasta: YYYY-MM-DD"
                            limit={10}
                            onChange={setDate}
                        />
                    </div>
                    <MediaButton 
                        onClick={getByDate}
                        text='Generar'
                        clase="prom_button"
                    />
              </div>
            )
        case 3:
            return (
            <div className="prom_cont">
                <div className="prom_center">
                En construccion
                </div>
            </div>
        )
        case 4:
            return (
            <div className="prom_container">
                <div className="prom_title">
                  Realizado con exito
                </div>
            </div>
        )
    
      default:
        return null
    }
  }

  return (
    <div className="prom_background">
      <div className="prom_container1">
        <div className="prom_title1">
          Promocion
        </div>
        <Button
          onClick={() => setProm(1)}
          text='Reporte por dia'
          clase="prom_button1"
        />
        <Button
          onClick={() => setProm(2)}
          text='Reporte por fecha'
          clase="prom_button1"
        />
        <Button
          onClick={() => setProm(3)}
          text='Recomendaciones'
          clase="prom_button1"
        />
        <Button
          onClick={goBack}
          text='Atras'
          clase="prom_button1"
        />
      </div>
      {selectProm()}
    </div>
  )
}