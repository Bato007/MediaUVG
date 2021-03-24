
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import '../Estilos/Home.css';
import Button from '../Components/MediaButton'
import Input from '../Components/MediaInput'

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

  // Para regresar al pasado
  const logOut = () => {
    history.push('/')
  }

  const toPlayList = () =>{
    history.push('/Home/PlayLists', { username, name, artist, premium, artistname })
  }

  const toPlaySong = (value) => {
    const songId = value.songid
    console.log(songId)
    history.push('/Play', { songId })
  }

  const toArtist = () => {
    history.push('/Home/Artist', { username, name, artist, premium, artistname })
  }

  // Searching a song 
  const searchSong = () => {
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
      <div>
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
      <div>
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
    }
  }

  
  return (
    <div className="fondo">
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
      

      <div className="cuadrop">
        <div id="nav">    
          <div className="titulonav">
            Perfil 
          </div>
          <div className="cuerporec">
            <ul>
              <li>{name}</li>
              <li>{username}</li>
              {showPlayList()}
              {showAuthor()}
              {showPremium()}
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
              <Button
                onClick={logOut}
                text='Cerrar sesion'
                clase="botonMenu"
              />
            </ul>
          </div> 
        </div>
      </div>
      
    </div> 
  );
}