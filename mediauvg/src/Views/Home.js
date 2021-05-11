/* eslint-disable no-dupe-keys */

import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import '../Estilos/Home.css';
import Button from '../Components/MediaButton'
import Update from '../Components/MediaUpdate'

const styles = {
  estiloSearch:{
    display: 'flex',
    justifiyContent: 'center',
    flowDirection: 'column',
    alignItems: 'center',
    margin: '15px',
    color:'white',
    height: '25px',
    width:"490px",
    borderRadius: '15px',
    margin: '10px',
    background: '#4e54c8',  /* fallback for old browsers */
    background: '-webkit-linear-gradient(to left, #8f94fb, #4e54c8)',  /* Chrome 10-25, Safari 5.1-6 */
    background: 'linear-gradient(to left, #8f94fb, #4e54c8)' /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  },
  cuadro:{
    backgroundColor:'white',
    miWidth: '35vh',
    minHeight: '40vh',
    boxShadow: '0 0 10px 5px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: '10%',
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
    minWidth: '75vh',
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
    if (!premium) {
      fetch("http://localhost:3001/account/hear", 
      {method: 'PUT', 
      body: JSON.stringify({ username }), 
      headers:{'Content-Type': 'application/json'}})
      .then((res) => res.json())
      .catch((error) =>  console.error('Error', error))
      .then((out) => {
        history.push('/Play', { username, name, artist, premium, artistname, songId, go })
      })
    } else {
      history.push('/Play', { username, name, artist, premium, artistname, songId, go })
    }
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
      setsearch('')
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
        <Update
          value={artistname}
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
          <Update 
            value={search}
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

  const goMonitor = () => (
    history.push('/Home/Monitoreo', { username, name, artist, premium, artistname })
  )

  const showResults = () => {
    if (bySong.length > 0 || byAlbum.length > 0 || byArtist.length > 0 || byGenre.length > 0  ) {
      return (
        <div style={styles.cuadro}>
          <div style={styles.estiloTexto}> Resultados </div>
            <div>
              {bySong.map((value) => {
                return(
                  <div 
                    key={value.songid} 
                    style={styles.estiloSearch} 
                    onClick={(event) => toPlaySong(value)}>
                    {value.songname} 
                  </div>                  
                )
              })}
              {byAlbum.map((value) => {
                return(
                      <div 
                        key={value.songid} 
                        style={styles.estiloSearch} 
                        onClick={(event) => toPlaySong(value)}>
                        {value.songname}
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
            const first = new Date(out[0].lastplay)
            const second = new Date()

            if (first.getFullYear() <= second.getFullYear() 
              && first.getMonth() <= second.getMonth()
              && first.getDate() < second.getDate()) {
                
                fetch("http://localhost:3001/account/update", 
                {method: 'PUT', 
                body: JSON.stringify({ date: second, username }), 
                headers:{'Content-Type': 'application/json'}})
                .then((res) => res.json())
                .catch((error) =>  console.error('Error', error))
                .then(console.log('hola'))
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
          onClick={goMonitor}
          text='Monitoreo'
          clase="botonMenu"
        />
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