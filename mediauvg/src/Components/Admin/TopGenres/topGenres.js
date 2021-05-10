import React, {useState} from 'react'

import './topGenres.css'
import Chart from '../Charts/Chart'
import MediaUpdate from '../../MediaInput'
import MediaButton from '../../MediaButton'

export default function TopGenres() {
  const [data, setData] = useState([])
  const [flag, setFlag] = useState(false)
  const [firstDate, setFirstDate] = useState('')
  const [lastDate, setLastDate] = useState('')

  // Obtiene las estadisticas
  const getStats = () => {
    fetch("http://localhost:3001/stats/top_generos", {
      method: 'POST',
      body: JSON.stringify({ firstDate, lastDate }), 
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
  return (
    <div className="week_container">
      <div className="week_title">
        Mejores Generos
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
      <MediaButton 
        onClick={getStats}
        text='Obtener Valores'
        clase="week_button"
      />
      {getChart()}
    </div>
  );
}