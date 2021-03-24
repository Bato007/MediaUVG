/* eslint-disable no-dupe-keys */

import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '../Components/MediaButton'
import Input from '../Components/MediaInput'
import '../Estilos/Home.css';

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
    minHeight: '90vh',
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
  playlist: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    width: '90%',
    margin: '10px',
    background: '#794be3',
    borderRadius: '10px',
    border: '2px solid black'
  },
  smallSideMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'white',
    marginLeft: '70px',
    minWidth: '45vh',
    margin: '15px',
    borderRadius: '10px',
    boxShadow: '0 0 10px 5px'
  },
}

export default function PlayLists() {
  const history = useHistory()
  const location = useLocation()
  const [ newPlaylist, setNewPlaylist ] = useState('')
  const [ action, setAction ] = useState(false)
  const { username, name, artist, premium, artistname } = location.state
  const [ playlists, setPlaylists ] = useState([])
  
  // Para regresar al pasado
  const toHome = () =>{
      history.push('/Home', { username, name, artist, premium, artistname })
  }
  
  const addPlaylist = () => {
    fetch("http://localhost:3001/add/playlist", 
    {method: 'POST', 
    body: JSON.stringify({ username, newPlaylist }), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out && out.status === '') {
        setAction(!action)
      }
      setNewPlaylist('')
    })
  }

  const getSongs = (value) => {
    console.log(value)
  }
  
  useEffect(() => {
    fetch("http://localhost:3001/search/playlist", 
    {method: 'POST', 
    body: JSON.stringify({ username }), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out) setPlaylists(out)
    })
  }, [action, username])
  
  return(
    <div style={styles.back}>  
      <div>
      <div style={styles.smallSideMenu}>
          <h1 style={styles.title}>
            Administrador
          </h1>
          <Input 
            type="text"
            placeholder="Nombre Playlist"
            limit={25}
            onChange={setNewPlaylist}
          />
          <Button 
            onClick={addPlaylist}
            text='Crear Playlist'
            clase='botonMenu'
          />
          <Button 
            onClick={toHome}
            text='Regresar'
            clase='botonMenu'
          />
        </div>
        <div style={styles.sideMenu}>
          <h1 style={styles.title}>
            PlayList
          </h1>
          {playlists.map((value) => {
            return(
              <div 
                style={styles.playlist}
                onClick={() => getSongs(value)}
              >
                {value.playlistname}
              </div>
              
            )
          })}
        </div>  
      </div>  
    </div> 
  )
}