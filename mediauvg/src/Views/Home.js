/* eslint-disable no-dupe-keys */

import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import '../Estilos/Home.css';
import Button from '../Components/MediaButton'
import Input from '../Components/MediaInput'

const styles = {
  estiloSearch:{
    backgroundColor:'#021B79',
    zIndex:1,
    color:'white',
    height: '25px',
    width:"490px",
    borderRadius: '15px',
    margin: '5px',
  },
  cuadro:{
    backgroundColor:'white',
    width: '500px',
    height: '500px',
    boxShadow: '0 0 10px 5px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column',
    marginRight: '220px',
    marginTop: '50px',
  },
  estiloTexto:{
    fontWeight: 'bold',
    fontFamily: "magneto",
    fontSize: '40px',
    color: 'black',
    padding: '4px',
  },
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
    alignItems: 'center',
    background: 'white',
    height: '90vh',
    marginLeft: '70px',
    minWidth: '45vh',
    margin: '15px',
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
  meduBody: {
    display: 'flex',
    flexDirection: 'column',
    justifiyContent: 'center'
  },
  name: {
    fontSize: '15px',
    color: '#000',
    padding: '1px'
  },
}

export default function Home() {
  const location = useLocation()
  const history = useHistory()
  const { name, username } = location.state

  const [ search, setsearch ] = useState('')
  const [ artistname, setArtistName ] = useState(location.state.artistname)
  const [ artist, setArtist ] = useState(location.state.artist)
  const [ premium, setPremium ] = useState(location.state.premium)
  const [ bySong, setBySong ] = useState([])
  const [ byAlbum, setByAlbum ] = useState([])
  const [ byGenre, setByGenre ] = useState([])
  const [ byArtist, setByArtist ] = useState([])

  const [ canHear, setCanHear ] = useState(false)

  // Para regresar al pasado
  const logOut = () => {
    history.push('/')
  }

  const toPlayList = () =>{
    history.push('/Home/PlayLists', { username, name, artist, premium, artistname })
  }

  const toPlaySong = (value) => {
    const songId = value.songid
    const go = '/Home'
    history.push('/Play', { username, name, artist, premium, artistname, songId, go })
  }

  const toArtist = () => {
    history.push('/Home/Artist', { username, name, artist, premium, artistname })
  }

  // Searching a song 
  const searchSong = () => {
    if (search !== '') {
      const data = {
        value: search
      }
      fetch("http://localhost:3001/search/song", 
      {method: 'POST', 
      body: JSON.stringify(data), 
      headers:{'Content-Type': 'application/json'}})
      .then((res) => res.json())
      .catch((error) =>  console.error('Error', error))
      .then((out) => {
        setBySong(out)
      })
  
      fetch("http://localhost:3001/search/album", 
      {method: 'POST', 
      body: JSON.stringify(data), 
      headers:{'Content-Type': 'application/json'}})
      .then((res) => res.json())
      .catch((error) =>  console.error('Error', error))
      .then((out) => {
        setByAlbum(out)
      })
      
      fetch("http://localhost:3001/search/genre", 
      {method: 'POST', 
      body: JSON.stringify(data), 
      headers:{'Content-Type': 'application/json'}})
      .then((res) => res.json())
      .catch((error) =>  console.error('Error', error))
      .then((out) => {
        setByGenre(out)
      })
  
        fetch("http://localhost:3001/search/artist", 
        {method: 'POST', 
        body: JSON.stringify(data), 
        headers:{'Content-Type': 'application/json'}})
        .then((res) => res.json())
        .catch((error) =>  console.error('Error', error))
        .then((out) => {
          setByArtist(out)
        })
    }
  }

  const showPlayList = () => {
    if (premium) return (
      <Button
        onClick={toPlayList}
        text='Listas de reproduccion'
        clase="botonMenu"
      /> 
    )
  }

  const makeArtist = () => {
    const data = {
      username,
      artistname
    }
    if (artistname !== '') {
      fetch("http://localhost:3001/account/goauthor", 
      {method: 'POST', 
      body: JSON.stringify(data), 
      headers:{'Content-Type': 'application/json'}})
      .then((res) => res.json())
      .catch((error) =>  console.error('Error', error))
      .then((out) => {
        if (out && out.status === '') setArtist(true) 
        setArtistName('')
      })
    }
  }

  const noLongerArtist = () => {
    const data = {
      username,
      artistname
    }
    fetch("http://localhost:3001/account/goauthor", 
    {method: 'DELETE', 
    body: JSON.stringify(data), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out && out.status === '') setArtist(false)
    })
  }

  const getPremium = () => {
    const data = {
      username
    }
    fetch("http://localhost:3001/account/gopremium", 
    {method: 'POST', 
    body: JSON.stringify(data), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out && out.status === '') setPremium(true) 
    })
  }

  const noPremium = () => {
    const data = {
      username
    }
    fetch("http://localhost:3001/account/cancelpremium", 
    {method: 'POST', 
    body: JSON.stringify(data), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out && out.status === '') setPremium(false) 
    })
  }

  const showAuthor = () => {
    if (artist) return (
      <div style={styles.meduBody}>
        <Button
          onClick={toArtist}
          text='Agregar Contenido'
          clase="botonMenu"
        />
        <Button
          onClick={noLongerArtist}
          text='Ya no ser artista'
          clase="botonMenu"
        />
      </div>
    )
    else return (
      <div style={styles.meduBody}>
        <Button
          onClick={makeArtist}
          text='Ser artista'
          clase="botonMenu"
        />
        <Input
          type="text"
          placeholder="Nombre Artista"
          limit={20}
          onChange={setArtistName}
        /> 
      </div>
    )
  }

  const showPremium = () => {
    if (premium) return (
      <Button
        onClick={noPremium}
        text='Anular Suscripción'
        clase="botonMenu"
      />
    )
    else return (
      <Button
        onClick={getPremium}
        text='Subscribirse'
        clase="botonMenu"
      />
    )
  }
  
  const showSearch = () => {
    if (premium || canHear) {
      return (
        <div style={styles.meduBody}>
          <Input 
            type="text"
            placeholder="Buscar"
            limit={20}
            onChange={setsearch}
          /> 
          <Button 
            onClick={searchSong}
            text='Search'
            clase='botonMenu'
          />
        </div>
      )
    }
  }

  const showResults = () => {
    if (bySong.length > 0 && byAlbum.length > 0 && byArtist.length > 0 && byGenre.length > 0  ) {
      return (
        <div style={styles.cuadro}>
          <div style={styles.estiloTexto}> Resultados </div>
            <div>
              {bySong.map((value) => {
                return(
                  <div>
                    <div 
                      key={value.songid} 
                      style={styles.estiloSearch} 
                      onClick={(event) => toPlaySong(value)}>
                      {value.songname} 
                    </div>
                  </div>
                  
                )
              })}
              {byAlbum.map((value) => {
                return(
                  <div>
                      <div 
                        key={value.songid} 
                        style={styles.estiloSearch} 
                        onClick={(event) => toPlaySong(value)}>
                        {value.songname}
                    </div>
                  </div>
                )
              })}
              {byGenre.map((value) => {
                return(
                  <div 
                    key={value.songid} 
                    style={styles.estiloSearch} 
                    onClick={(event) => toPlaySong(value)}>
                    {value.songname} 
                  </div>
                )
              })}
            {byArtist.map((value) => {
              return(
                <div 
                  key={value.songid} 
                  style={styles.estiloSearch} 
                  onClick={(event) => toPlaySong(value)}>
                  {value.songname} 
                </div>
              ) 
            })}
          </div>
        </div>
      )
    }
  }

  useEffect(() => {
    if (!premium) {
      fetch("http://localhost:3001/account/canhear", 
      {method: 'PUT', 
      body: JSON.stringify({ username }), 
      headers:{'Content-Type': 'application/json'}})
      .then((res) => res.json())
      .catch((error) =>  console.error('Error', error))
      .then((out) => {
        if (out) {
          if (out[0].playbackleft < 1) {
            setCanHear(false)
          } else {
            setCanHear(true)
          }
        }
      })
    }
  }, [premium, username])

  return (
    <div style={styles.back}>
      <div style={styles.sideMenu}>   
        <div style={styles.title}>
          Perfil 
        </div>
        <h3 style={styles.name}>{name}</h3>
        <h3 style={styles.name}>{username}</h3>
        {showPlayList()}
        {showAuthor()}
        {showPremium()}
        {showSearch()}
        <Button
          onClick={logOut}
          text='Cerrar sesion'
          clase="botonMenu"
        /> 
      </div>
      
      {showResults()}
      
    </div> 
  );
}