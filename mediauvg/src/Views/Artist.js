/* eslint-disable no-dupe-keys */
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Grid } from '@material-ui/core'
import { es } from "date-fns/locale"
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers'
import lazyStitch from '../Estilos/giphy.gif'
import Button from '../Components/MediaButton'
import Update from '../Components/MediaUpdate'

const styles = {
  back: {
    display: 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    minHeight: '100vh',
    alignItems: 'center',
    background: '#0575E6',  /* fallback for old browsers */
    background: '-webkit-linear-gradient(to bottom, #021B79, #0575E6)',  /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to bottom, #021B79, #0575E6)',
  },
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'white',
    height: '40vh',
    marginLeft: '70px',
    minWidth: '45vh',
    margin: '15px',
    borderRadius: '10px',
    boxShadow: '0 0 10px 5px'
  },
  inputForm: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'white',
    height: '65vh',
    minWidth: '45vh',
    marginRight: '13%',
    borderRadius: '10px',
    boxShadow: '0 0 10px 5px'
  },
  title:{
    fontWeight: 'bold',
    fontFamily: 'magneto',
    fontSize: '40px',
    color: '#000',
    padding: '4px'
  },
  image: {
    marginRight: '8%'
  }
}

export default function Home() {
  const location = useLocation()
  const history = useHistory()
  const { username, name, artist, premium, artistname } = location.state

  const [ songname, setSongName ] = useState('')
  const [ songalbum, setSongAlbum ] = useState('')
  const [ songlink, setSongLink ] = useState('')
  const [ form, setForm ] = useState('')
  
  const [ albumname, setAlbumName ] = useState('')
  const [ selectedDate, setSelectedDate ] = useState(new Date())

  const getAddSong = () => {
    setForm('song')
    setAlbumName('')
    setSelectedDate(new Date())
  }

  const getAddAlbum = () => {
    setForm('album')
    setSongName('')
    setSongAlbum('')
    setSongLink('')
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const addSong = () => {
    const data = {
      songname,
      songalbum,
      songlink,
      artistname
    }
    fetch("http://localhost:3001/add/song", 
    {method: 'POST', 
    body: JSON.stringify(data), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out && out.status === '') {
        setSongName('')
        setSongAlbum('')
        setSongLink('')
        setForm('')
      }
    }) 
  }

  const addAlbum = () => {
    const fecha = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
    const data = {
      albumname,
      fecha,
      artistname
    }
    fetch("http://localhost:3001/add/album", 
    {method: 'POST', 
    body: JSON.stringify(data), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out && out.status === '') {
        setAlbumName('')
        setSelectedDate(new Date())
        setForm('')
      }
    })
  }

  const goHome = () => {
    history.push('/Home', { username, name, artist, premium, artistname })
  }

  const getForm = () => {
    switch (form) {
      case 'song':
        return(
          <div style={styles.inputForm} >
            <h1 style={styles.title}>
              Canción
            </h1>
            <Update 
              value={songname}
              type="text"
              placeholder="Nombre Canción"
              limit={20}
              onChange={setSongName}
            />
            <Update 
              value={songalbum}
              type="text"
              placeholder="Nombre Album"
              limit={20}
              onChange={setSongAlbum}
            />
            <Update
              value={songlink} 
              type="text"
              placeholder="Link de Canción"
              limit={35}
              onChange={setSongLink}
            />
            <Button 
              onClick={addSong}
              text='Agregar'
              clase='botonMenu'
            />
          </div>
        )
      case 'album':
        return(
          <div style={styles.inputForm}>
            <h1 style={styles.title}>
              Album
            </h1>
            <Update
              value={albumname} 
              type='text'
              placeholder='Nombre Album'
              limit={35}
              onChange={setAlbumName}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es} >
                <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="fecha"
                    label="Fecha"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
                </Grid>
            </MuiPickersUtilsProvider>
            <Button 
              onClick={addAlbum}
              text='Agregar'
              clase='botonMenu'
            />
          </div>
        )
      default:
        return <img style={styles.image} src={lazyStitch} alt='Sin form'/>
    }
  }

  return (
    <div style={styles.back}>  
      <div style={styles.sideMenu}>
        <h1 style={styles.title}>
          Perfil 
        </h1>
        <Button 
          onClick={getAddSong}
          text='Agregar Canción'
          clase='botonMenu'
        />
        <Button 
          onClick={getAddAlbum}
          text='Agregar Album'
          clase='botonMenu'
        />
        <Button 
          onClick={goHome}
          text='Regresar'
          clase='botonMenu'
        />
      </div>
      {getForm()}
    </div> 
  );
}