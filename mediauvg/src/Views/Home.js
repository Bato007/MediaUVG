
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import '../Estilos/Home.css';
import Button from '../Components/MediaButton'
import Input from '../Components/MediaInput'

export default function Home() {
  const history = useHistory()
  const [ search, setsearch ] = useState('')
  const [ songResult, setSongResult ] = useState({
    bySong: [],
    byAlbum: [],
    byGenre: [],
    byArtist: [],
  })
  const location = useLocation()
  const { admin, name, password, 
    playback, premium, username } = location.state

  // Para regresar al pasado
  const logOut = () => {
    history.push('/')
  }
  const toPlayList = () =>{
    history.push('/PlayLists')
  }

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
    })
  }

  console.log(songResult)

  return (
    <div className="fondo">
      <div className="cuadrop">
        <div id="nav">    
          <div className="titulonav">
            Perfil 
          </div>

          <div className="cuerporec">
            <ul>
              {/* <li>{name}</li> */}
              {/* <li>{username}</li> */}
              <Button
                onClick={toPlayList}
                text='Listas de reproduccion'
                clase="botonMenu"
              /> 
              <Button
                onClick={''}
                text='Ser artista'
                clase="botonMenu"
              />
              <Button
                onClick={''}
                text='Subscribirse'
                clase="botonMenu"
              />
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