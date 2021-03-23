import React, { useState, useEffect } from 'react'

import Switch from './Switch'
import Table from './SongTable'
import Button from '../MediaButton'
import Update from '../MediaUpdate'
import '../songForm.css';

export default function SongFomr({ form }) {
  const [ song, setSong ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])

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

  const onSelected = () => {
    if(song.songid !== undefined && song.songid !== -1) return (
      <div>
        <Switch
          onChange={onSetActive}
          text='Active'
          active={song.active}
        />  
        <div id="navegador">
          <ul>
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
          
          <Button 
            onClick={updateSong}
            clase="button"
            text='Actualizar'
          />
          <Button
            onClick={deleteSong}
            text='Eliminar'
            clase="button"
          />
          </ul>
        </div>
        
        
      </div>
    )
  }

  useEffect(() => {
    fetch('http://localhost:3001/search/song', 
    {method: 'GET', 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      setRows(out)
    })
  }, [form, action])

  const updateSong = () => {
    const data = { 
      songid: song.songid,
      songname: song.songname,
      songlink: song.songlink,
      author: song.author,
      albumname: song.albumname,
      active: song.active
    }

    // Se actualiza la informacion
    fetch('http://localhost:3001/admin/song', 
    {method: 'PUT', 
    body: JSON.stringify(data),
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

  return (
    <div id="margen">
      <Table 
        rows={rows}
        rowsNumber={rows.length}
        onClick={onClick}
        page={page}
        setPage={setPage}
      />
      {onSelected()}
    </div>
  );
}