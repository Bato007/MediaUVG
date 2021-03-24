import React, { useEffect, useState } from 'react'

import ActiveUsers from './Charts/Chart'
import '../songForm.css';

export default function StatisticsForm({ form }) {
  
  const [data1, setData1] = useState({})
  const [data2, setData2] = useState({})
  const [data3, setData3] = useState({})
  const [data4, setData4] = useState({})
  const [data5, setData5] = useState({}) 
  const [lista, setLista] = useState([]) 

  useEffect(() => {
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
      setData1(() => {
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
  }, [])

  useEffect(() => {
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
      setData2(() => {
        return(
          {
            labels: artists,
            datasets: [
              {
                label: 'Subscripciones',
                data: rise,
                backgroundColor: ['green', 'green', 'green', 'green', 'green']
              }
            ]
          }
        )
      })
    })
  }, [])

  useEffect(() => {
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
      setData3(() => {
        return(
          {
            labels: artists,
            datasets: [
              {
                label: 'Produccion',
                data: rise,
                backgroundColor: ['green', 'green', 'green', 'green', 'green']
              }
            ]
          }
        )
      })
    })
  }, [])

  useEffect(() => {
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
      setData4(() => {
        return(
          {
            labels: artists,
            datasets: [
              {
                label: 'Reproducciones',
                data: rise,
                backgroundColor: ['green', 'green', 'green', 'green', 'green']
              }
            ]
          }
        )
      })
    })
  }, [])

  useEffect(() => {
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
      setData5(() => {
        return(
          {
            labels: artists,
            datasets: [
              {
                label: 'Actividad',
                data: rise,
                backgroundColor: ['green', 'green', 'green', 'green', 'green']
              }
            ]
          }
        )
      })
    })
  }, [])

  
  useEffect(() => {
    fetch("http://localhost:3001/stats/weeklyalbum",
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }).then((res) => res.json())
    .catch((error) => console.log(error))
    .then((out) => {
      setLista(out)
      console.log(out)
    })
  }, [])
  const styles = {
    cuadro:{
      backgroundColor:'#021B79',
      width: 'auto',
      height: '60px',
      marginLeft: '20px',
      marginRight: '20px',
      marginBottom: '20px',
    },
    estiloTexto:{
      fontWeight: 'bold',
      fontFamily: "magneto",
      fontSize: '20px',
      color: 'white',
      padding: '4px',
    }
  }



  return (
    <div id="margen">
      <div className ="navegador">
        <div style={{backgroundColor:'black', color:'white', padding:'15px', borderRadius:'15px'}}>
          <h2>Albumes más recientes de la última semana</h2>
          <dl>
            {lista.map((values) => {
              return(
                <div style={styles.cuadro}>
                  <dt style={styles.estiloTexto}>{values.albumname}</dt>
                  <dd style={styles.estiloTexto}>-by {values.author}</dd>
                </div>
              )
            })
            }
          </dl>
        </div>
        <div>
          <ul>
            <ActiveUsers 
              title='Artistas con popularidad creciente en los últimos tres meses'
              chartData={data1}
            />
            <ActiveUsers 
              title='Cantidad de nuevas suscripciones durante los últimos seis meses'
              chartData={data2}
            />
            
            <ActiveUsers 
              title='Artistas con mayor producción músical'
              chartData={data3}
            />
            <ActiveUsers 
              title='Géneros más populares'
              chartData={data4}
            />
            <ActiveUsers 
              title='Usuarios más Activos'
              chartData={data5}
            />
          </ul>
        </div>
      </div>
      
    </div>
  );
}