import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './song.css'
import Table from '../../Components/Admin/SongTable'
import Button from '../../Components/MediaButton'
import Update from '../../Components/MediaUpdate'
import Switch from '../../Components/Admin/Switch'

export default function SongEdit() {
  const history = useHistory()
  const location = useLocation()

  const [ song, setSong ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])
  const username = location.state

  useEffect(() => {
    fetch('http://localhost:3001/search/song', 
    {method: 'GET', 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
     console.log(out)
      setRows(out)
    })
  }, [action])

  // Para regresar al pasado
  const goBack = () => {
    history.goBack(location.state)
  }

  const onClick = (selected) => {
    setSong(selected)
  }

  const onSetSong = (text) => {
    setSong({
      ...song,
      songname: text
    })
  }

  const onSetAlbum = (text) => {
    setSong({
      ...song,
      albumname: text
    })
  }

  const onSetAuthor = (text) => {
    setSong({
      ...song,
      author: text
    })
  }

  const onSetLink = (text) => {
    setSong({
      ...song,
      songname: text
    })
  }

  const onSetActive = (active) => {
    setSong({
      ...song,
      active: active
    })
  }

  const onSetGenre = (genre) => {
    setSong({
      ...song,
      genres: genre
    })
  }

  const deleteSong = () => {
    fetch('http://localhost:3001/admin/song', 
    {method: 'DELETE', 
    body: JSON.stringify(song),
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      console.log(out)
      if (out.status === '') {
        setSong({})
        setAction(!action)
      } else {
        console.log('no se borro')
      }
    })
  }


  const onSelected = () => {
    if(song.songid !== undefined && song.songid !== -1) return (
      <div>
        <div className="updaters">
        <Switch
          onChange={onSetActive}
          text='Active'
          active={song.active}
        />  
            <Update 
              onChange={onSetSong}
              placeholder={''}
              limit={20}
              type='text'
              value={song.songname}
            />
          <Update 
            onChange={onSetAlbum}
            placeholder={''}
            limit={20}
            type='text'
            value={song.albumname}
          />
          <Update 
            onChange={onSetAuthor}
            placeholder={''}
            limit={20}
            type='text'
            value={song.author}
          />
          <Update 
            onChange={onSetLink}
            placeholder={''}
            limit={20}
            type='text'
            value={song.songlink}
          />
          <Update 
            onChange={onSetGenre}
            placeholder={''}
            limit={20}
            type='text'
            value={song.genres}
          />
          <Button
            onClick={deleteSong}
            text='Eliminar'
            clase="button"
          />
        </div>
        <div className="middle">
          <Button 
            onClick={updateSong}
            clase="button"
            text='Actualizar'
          />
        </div>
      </div>
    )
  }

  const updateSong = () => {
    const data = { 
      ...song,
      modifier: username,
    }

    // Se actualiza la informacion
    fetch('http://localhost:3001/edit/song', 
    {method: 'POST', 
    body: JSON.stringify(data),
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out.status === 'DONE') {
        setSong({})
        setAction(!action)
      }
    })
  }

  return (
      <div className="song_container">
          <Button
            onClick={goBack}
            text='Atras'
            clase="song_goback"
          />  
        <div className="song_containers">
          <Table 
            rows={rows}
            rowsNumber={rows.length}
            onClick={onClick}
            page={page}
            setPage={setPage}
          />
          {onSelected()}
        </div>
      </div> 
  );
}
