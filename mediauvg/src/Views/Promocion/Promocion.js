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
  const [recomendation, setRecomendation] = useState([])

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
      setProm(4)
    } else {
      setProm(5)
    }
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
        setProm(4)
      } else {
        setProm(5)
      }
      setDate('')
    }

    // Obtiene las recomendaciones
    const getRecomendation = () => {
      //console.log("fecha",date)
      
      if (date !== '' ) {
        
        const data = {
          date: date,
        }
        console.log("fecha",data)
        fetch('http://localhost:3001/mongo/report',
        {method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-type': 'application/json'}})
        .then((res) => res.json())
        .catch((error) => console.error('Error', error))
        .then((out) => {
          //console.log(out)
          setRecomendation(recomendation => [...recomendation, out]);
          //setRecomendation(out)
          
          //recomendation.splice(0,1)
          setProm(6)
        })
      } else {
        setProm(5)
      }
      
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
                            type="date"
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
                            type="date"
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
            <div className="prom_container">
                <div className="prom_title">
                    Elige una fecha
                    </div>
                    <div className="prom_temp">
                        <MediaUpdate
                            value={date}
                            type="date"
                            limit={10}
                            onChange={setDate}
                        />
                    </div>
                    <MediaButton 
                        onClick={getRecomendation}
                        text='Generar'
                        clase="prom_button"
                    />
                    
                
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
        case 5:
            return (
            <div className="prom_container">
                <div className="prom_title">
                  Error, vuelva a intentar
                </div>
            </div>
        )
        case 6:
            return (
            <div className="prom_container">
                <div className="prom_title">
                  Recomendaciones
                </div>
                {recomendation[0].map((value) => {
                  //console.log(value.hasOwnProperty("recomendation"))
                  // validar que algun usuario no tenga recomendaciones
                  // no los muestra :c
                  if (value.hasOwnProperty("recomendation") === false){
                    return (
                      <div key={value.username} >
                        Para el usuario {value.username} no se recomienda nada
                      </div>
                    )
                  }

                  return (
                    <div className="recomendation">
                      <div key={value.username} className="songsRecomedation">
                          <div className="songsRecomedationTitle">
                            Para el usuario {value.username} se recomienda
                          </div>
                            {value.recomendation.map(value => {
                            return (
                              <div key={value.songname} >
                                {value.songname} de {value.author}
                              </div>  
                            )
                          })} 
                      </div>
                    </div>
                    
                  )
                })}
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
          MongoDB
        </div>
        <Button
          onClick={() => setProm(1)}
          text='Migracion por dia'
          clase="prom_button1"
        />
        <Button
          onClick={() => setProm(2)}
          text='Migracion hasta dia'
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