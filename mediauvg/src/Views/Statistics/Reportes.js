/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import { useHistory} from 'react-router-dom'

import './stats.css'
import Chart from '../../Components/Admin/Charts/Chart'
import Payment from '../../Components/Admin/Payments/payment'
import WeekReport from '../../Components/Admin/StatsWeek/weekStats'
import TopSales from '../../Components/Admin/TopSales/topSales'
import TopGenres from '../../Components/Admin/TopGenres/topGenres'
import TopSongs from '../../Components/Admin/TopSongs/topSongs'
import Button from '../../Components/MediaButton'

export default function Stats() {
  const history = useHistory()
  
  const [stat, setStat] = useState(0)
  const [lastRealeses, setLastRealeses] = useState({})
  const [risingArtist, setRisingArtist] = useState({})
  const [last6monthsSubs, setLast6monthsSubs] = useState({})
  const [mostSongs, setMostSongs] = useState({})
  const [popularSongs, setPopularSongs] = useState({})
  const [mostActive, setMostActive] = useState({})
  const [artistPay, setArtistPay] = useState([])

  // Para regresar al pasado
  const goBack = () => {
    history.goBack()
  }

  const selectStats = () => {
    switch (stat) {
      case 1:
        return (
          <div style={{backgroundColor:'black', color:'white', padding:'15px', borderRadius:'15px'}}>
          <h2>Albumes más recientes de la última semana</h2>
          <dl>
            {lastRealeses.map((values) => {
              return(
                <div key={values.albumname} className="stats_cuadro">
                  <dt className="stats_text">{values.albumname}</dt>
                  <dd className="stats_text">-by {values.author}</dd>
                </div>
              )
            })
            }
          </dl>
        </div>
        )
      case 2:
        return (
          <Chart 
            title='Artistas con popularidad creciente en los últimos tres meses'
            chartData={risingArtist}
          />
        )
      case 3:
        return (
          <Chart 
            title='Cantidad de nuevas suscripciones durante los últimos seis meses'
            chartData={last6monthsSubs}
          />
        )
      case 4:
        return (
          <Chart 
            title='Artistas con mayor producción músical'
            chartData={mostSongs}
          />
        )
      case 5:
        return (
          <Chart 
          title='Géneros más populares'
          chartData={popularSongs}
        />
        )
      case 6:
        return (
          <Chart 
            title='Usuarios más Activos'
            chartData={mostActive}
          />
        )
      case 7:
        return (
          <Payment
            data={artistPay}
          />
        )
      case 8:
        return (
          <WeekReport />
        )
      case 9:
        return (
          <TopSales />
        )
      case 10:
        return (
          <TopGenres />
        )
      case 11:
        return (
          <TopSongs />
        )
      default:
        return (<div></div>)
    }

  }

  useEffect(() => {
    fetch("http://localhost:3001/stats/weeklyalbum",
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      setLastRealeses(out)
    })

    // Mejores artistas en ultimos 3 meses
    fetch("http://localhost:3001/stats/artistsrise",
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      const artists = []
      const rise = []
      out.map((value) => {
        artists.push(value.artistname)
        rise.push(value.rise)
      })
      setRisingArtist(() => {
        return(
          {
            labels: artists,
            datasets: [
              {
                label: 'Incremento en los ultimos 3 meses',
                data: rise,
                backgroundColor: ['#099FBD', '#06677A', '#0CD2FA', '#088198', '#0BBDE0']
              }
            ]
          }
        )
      })
    })

    // Subscribsiones en ultimos 6 meses
    fetch("http://localhost:3001/stats/subsrise",
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      const artists = []
      const rise = []
      out.map((value) => {
        artists.push(value.year + '-' + value.month)
        rise.push(value.count)
      })
      setLast6monthsSubs(() => {
        return(
          {
            labels: artists,
            datasets: [
              {
                label: 'Subscripciones',
                data: rise,
                backgroundColor: ['#099FBD', '#06677A', '#0CD2FA', '#088198', '#0BBDE0']
              }
            ]
          }
        )
      })
    })

    // Artistas con mayor produccion
    fetch("http://localhost:3001/stats/production",
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      const artists = []
      const rise = []
      out.map((value) => {
        artists.push(value.author)
        rise.push(value.count)
      })
      setMostSongs(() => {
        return(
          {
            labels: artists,
            datasets: [
              {
                label: 'Produccion',
                data: rise,
                backgroundColor: ['#099FBD', '#06677A', '#0CD2FA', '#088198', '#0BBDE0']
              }
            ]
          }
        )
      })
    })

    // Generos populares
    fetch("http://localhost:3001/stats/populargenre",
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      const artists = []
      const rise = []
      out.map((value) => {
        artists.push(value.songgenre)
        rise.push(value.reproducciones)
      })
      setPopularSongs(() => {
        return(
          {
            labels: artists,
            datasets: [
              {
                label: 'Reproducciones',
                data: rise,
                backgroundColor: ['#099FBD', '#06677A', '#0CD2FA', '#088198', '#0BBDE0']
              }
            ]
          }
        )
      })
    })

    // Usuarios mas activos
    fetch("http://localhost:3001/stats/activeuser",
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      const artists = []
      const rise = []
      out.map((value) => {
        artists.push(value.username)
        rise.push(value.playback)
      })
      setMostActive(() => {
        return(
          {
            labels: artists,
            datasets: [
              {
                label: 'Actividad',
                data: rise,
                backgroundColor: ['#099FBD', '#06677A', '#0CD2FA', '#088198', '#0BBDE0']
              }
            ]
          }
        )
      })
    })

    // Reporte de pago de la plataforma
    fetch("http://localhost:3001/stats/payment",
    {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      setArtistPay(out)
    })
  }, [])

  return (
      <div className="stats_back">
        <div className="stats_cont">
          <div class="stats_title">
            Estadisticas
          </div>
  
          <Button
            onClick={() => setStat(1)}
            text='Albumes recientes ultima semana'
            clase="stats_boton"
          /> 
          <Button
            onClick={() => setStat(2)}
            text='Mejores artistas en ultimos 3 meses'
            clase="stats_boton"
          />
          <Button
            onClick={() => setStat(3)}
            text='Subscribsiones en ultimos 6 meses'
            clase="stats_boton"
          />
          <Button
            onClick={() => setStat(4)}
            text='Artistas con mayor produccion'
            clase="stats_boton"
          />
          <Button
            onClick={() => setStat(5)}
            text='Generos populares'
            clase="stats_boton"
          />
          <Button
            onClick={() => setStat(6)}
            text='Usuarios mas activos'
            clase="stats_boton"
          />
          <Button
            onClick={() => setStat(7)}
            text='Comisiones para Artistas'
            clase="stats_boton"
          />
          <Button
            onClick={() => setStat(8)}
            text='Total por Semana'
            clase="stats_boton"
          />
          <Button
            onClick={() => setStat(9)}
            text='Mayores ventas de Artistas'
            clase="stats_boton"
          />
          <Button
            onClick={() => setStat(10)}
            text='Mayores ventas por género'
            clase="stats_boton"
          />
          <Button
            onClick={() => setStat(11)}
            text='Canciones más reproducidas'
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