/* eslint-disable no-dupe-keys */

import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '../Components/MediaButton'
import Update from '../Components/MediaUpdate'
import lazyStitch from '../Estilos/giphy.gif'

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
  title: {
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
    color: 'white',
    borderRadius: '10px',
    background: '#021B79'
  },
  smallSideMenu: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'white',
    marginLeft: '70px',
    minWidth: '45vh',
    margin: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px 5px'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#141E30',  /* fallback for old browsers */
    background: '-webkit-linear-gradient(to bottom, #243B55, #141E30)', /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to bottom, #243B55, #141E30)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    borderRadius: '10px',
    boxShadow: '0 0 10px 5px',
    marginRight: '15%',
    padding: '10px',
    minHeight: '50px',
    minWidth: '50px'
  },
  song: {
    display: 'flex',
    flexDirection: 'column',
    width: '75%',
    height: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px',
    borderRadius: '10px',
    padding: '5px',
    background: '#0575E6', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 
  },
  name: {
    fontSize: '15px',
    color: 'white',
    padding: '1px'
  },
}

export default function PlayLists() {
  const history = useHistory()
  const location = useLocation()
  const [ newname, setNewName ] = useState('')
  const [ playlists, setPlaylists ] = useState([])

  const [ playlistTitle, setTitle ] = useState([])
  const [ songs, setSongs ] = useState([])

  const [ action, setAction ] = useState(false)
  const { username, name, artist, premium, artistname } = location.state

  // Para regresar al pasado
  const toHome = () => {
    history.push('/Home', { username, name, artist, premium, artistname })
  }
  
  const toPlay = (value) => {
    const songId = value.songid
    const go = '/Home/PlayLists'
    history.push('/Play', { username, name, artist, premium, artistname, songId, go })
  }

  const putSongs = () => {
    if (songs.length > 0) {
      return (
        <div style={styles.container} >
          <h1 style={styles.title}>
            {playlistTitle}
          </h1>
          {songs.map((value) => {
            return(
            <div 
              style={styles.song}
              onClick={() => toPlay(value)}
              key={value.songid}
            >
              <h2 style={styles.name}>
                {value.songname} by {value.author}
              </h2>
            </div>)
          })}
        </div>
      ) 
    } else {
      return <img style={styles.image} src={lazyStitch} alt='Sin form'/>
    }
  }

  const addPlaylist = () => {
    if (newname !== ''){
      fetch("http://localhost:3001/add/playlist", 
      {method: 'POST', 
      body: JSON.stringify({ username, newPlaylist: newname }), 
      headers:{'Content-Type': 'application/json'}})
      .then((res) => res.json())
      .catch((error) =>  console.error('Error', error))
      .then((out) => {
        if (out && out.status === '') {
          setAction(!action)
          setNewName('')
          setSongs([])
        }
      })
    }
  }

  const getSongs = (value) => {
    const { playlistid } = value
    fetch("http://localhost:3001/search/playlist/songs", 
    {method: 'POST', 
    body: JSON.stringify({ playlistid }), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out) {
        setNewName('')
        setSongs(out)
        setTitle(value.playlistname)
      }
    })
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
          <Update
            value={newname} 
            type="text"
            placeholder="Nombre Playlist"
            limit={25}
            onChange={setNewName}
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
            PlayLists
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
      {putSongs()}
    </div> 
  )
}