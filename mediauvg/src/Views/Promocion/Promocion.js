import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Button from '../../Components/MediaButton'
import './Promocion.css'
import Chart from '../../Components/Admin/Charts/Chart'
import MediaUpdate from '../../Components/MediaUpdate'
import MediaButton from '../../Components/MediaButton'

export default function Promocion() {
  const history = useHistory()
  const [date, setDate] = useState('')
  const [prom, setProm] = useState(0)
  const [data, setData] = useState([])
  const [flag, setFlag] = useState(false)

  const goBack = () => {
    history.goBack()
  }

  const getChart = () => {
    if (flag) {
      return (
        <Chart 
          title='Mejores Generos'
          chartData={data}
        />
      )
    } 
    return (
      <div></div>
    )
    }
    // Obtiene las estadisticas
  const getStats = () => {
    fetch("http://localhost:3001/stats/top_generos", {
      method: 'POST',
      body: JSON.stringify({ date }), 
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      const genre = []
      const sales = []
      // eslint-disable-next-line array-callback-return
      out.map((value) => {
        genre.push(value.genre)
        sales.push(value.sales)
      })
      setData({
        labels: genre,
        datasets: [
          {
            label: 'Sales',
            data: sales,
            backgroundColor: ['#099FBD', '#06677A', '#0CD2FA', '#088198', '#0BBDE0']
          }
        ]
      })
    })
    setFlag(true)
  }
  const selectProm = () => {
    switch (prom) {
        case 1:
            return (
                <div className="prom_container">
                    <div className="prom_title">
                    Solo ese dia
                    </div>
                    <div className="prom_temp">
                        <MediaUpdate
                            value={date}
                            type="text"
                            placeholder="Doa: YYYY-MM-DD"
                            limit={10}
                            onChange={setDate}
                        />
                    </div>
                    <MediaButton 
                        onClick={getStats}
                        text='Obtener Valores'
                        clase="prom_button"
                    />
            {getChart()}
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
                        onClick={getStats}
                        text='Obtener Valores'
                        clase="prom_button"
                    />
                {getChart()}
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
          text='Buscar por dia'
          clase="prom_button1"
        />
        <Button
          onClick={() => setProm(2)}
          text='Buscar por fecha'
          clase="prom_button1"
        />
        <Button
          onClick={() => setProm(3)}
          text='Recomendacion'
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