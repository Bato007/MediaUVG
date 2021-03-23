
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import '../Estilos/Home.css';
import Button from '../Components/MediaButton'
import Input from '../Components/MediaInput'
import Cuadro from '../Components/MediaCuadro'

export default function Home() {
  const location = useLocation()
  const history = useHistory()
  const { name, username } = location.state

  const [ search, setsearch ] = useState('')
  const [ artistname, setArtistName ] = useState('')
  const [ artist, setArtist ] = useState(location.state.artist)
  const [ premium, setPremium ] = useState(location.state.premium)
  const [ songResult, setSongResult ] = useState({
    bySong: [],
    byAlbum: [],
    byGenre: [],
    byArtist: [],
  })
  const [ ready, setReady ] = useState({
    bySong: false,
    byAlbum: false,
    byGenre: false,
    byArtist: false,
  })

  // Para regresar al pasado
  const logOut = () => {
    const idCancion = {songId: 1}
    history.push('/Play', idCancion)
  }
  const toPlayList = () =>{
    history.push('/PlayLists')
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
      setSongResult({
        ...songResult,
        bySong: out
      })
      setReady({
        ...ready,
        bySong: true
      })
    })

    fetch("http://localhost:3001/search/album", 
    {method: 'POST', 
    body: JSON.stringify(data), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      setSongResult({
        ...songResult,
        byAlbum: out
      })
      setReady({
        ...ready,
        byAlbum: true
      })
    })

    fetch("http://localhost:3001/search/genre", 
    {method: 'POST', 
    body: JSON.stringify(data), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      setSongResult({
        ...songResult,
        byGenre: out
      })
      setReady({
        ...ready,
        byGenre: true
      })
    })

    fetch("http://localhost:3001/search/artist", 
    {method: 'POST', 
    body: JSON.stringify(data), 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      setSongResult({
        ...songResult,
        byArtist: out
      })
      setReady({
        ...ready,
        byArtist: true
      })
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
      <Button
        onClick={noLongerArtist}
        text='Ya no ser artista'
        clase="botonMenu"
      />
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

  const showResult = () =>{
    
    if (ready.bySong  ) {
      // pues aqui se busca en cada array si hay un resultado de lo que escribio el usuario
    for (var a = 0; a<songResult.byAlbum.length; a++ ){
      console.log("aqui",songResult.byAlbum[a].albumName)
      return(// se supone que deberia de retornar este boton pero nel, algo asi lo tiene brandon en songform
        <Button
          onClick={''}
          text={songResult.byAlbum[a].albumName}
          clase="botonMenu"
        />
      )
    }
    for(var s = 0; s<songResult.bySong.length; s++ ){
      console.log("aqui",songResult.bySong[s].songname)
      return(// se supone que deberia de retornar este boton pero nel, algo asi lo tiene brandon en songform
        <Button
          onClick={''}
          text={songResult.bySong[s].songname}//no jala el nombre pero si haces console.og si :|
          clase="botonMenu"
        />
      )
    }
    for(var g = 0; g<songResult.byGenre.length; g++ ){
      console.log(songResult.byGenre[g].songname)
    }
    for(var ar = 0; ar<songResult.byArtist.length; ar++ ){
      console.log(songResult.byArtist[ar].songname)
    }
    }
    
  }

  return (
    <div className="fondo">
      <div className="cuadrop">
          
        <div id="nav">    
          <div className="titulonav">
            Perfil 
          </div>
          <div>
            <Cuadro
              text='Resultados'
            />
            {showResult()}
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