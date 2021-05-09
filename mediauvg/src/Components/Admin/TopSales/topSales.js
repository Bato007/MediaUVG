import React, {useState} from 'react'

import './topSales.css'
import Chart from '../Charts/Chart'
import MediaUpdate from '../../MediaInput'
import MediaButton from '../../MediaButton'

export default function TopSales() {
  const [data, setData] = useState([])
  const [flag, setFlag] = useState(false)
  const [firstDate, setFirstDate] = useState('')
  const [lastDate, setLastDate] = useState('')
  const [maxie, setMaxie] = useState(1)

  // Obtiene las estadisticas
  const getStats = () => {
    fetch("http://localhost:3001/stats/max_author", {
      method: 'POST',
      body: JSON.stringify({ firstDate, lastDate, maxie }), 
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      console.log(out)
      const author = []
      const plays = []
      out.map((value) => {
        author.push(value.author)
        plays.push(value.plays)
      })
      setData({
        labels: author,
        datasets: [
          {
            label: 'Sales',
            data: plays,
            backgroundColor: ['#099FBD', '#06677A', '#0CD2FA', '#088198', '#0BBDE0']
          }
        ]
      })
    })
    setFlag(true)
  }

  const getChart = () => {
    if (flag) {
      return (
        <Chart 
          title='Autores más Exitosos'
          chartData={data}
        />
      )
    } 
    return (
      <div></div>
    )
  }
  return (
    <div className="week_container">
      <div className="week_title">
        Total de ventas
      </div>
      <div className="week_temp">
        <MediaUpdate
            value={firstDate}
            type="text"
            placeholder="Desde: YYYY-MM-DD"
            limit={10}
            onChange={setFirstDate}
        />
        <MediaUpdate
            value={lastDate}
            type="text"
            placeholder="Hasta: YYYY-MM-DD"
            limit={10}
            onChange={setLastDate}
        />
      </div>
      <MediaUpdate
          value={maxie}
          type="number"
          placeholder="Cantidad de autores"
          limit={10}
          onChange={setMaxie}
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