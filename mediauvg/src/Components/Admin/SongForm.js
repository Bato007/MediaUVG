import React, { useState, useEffect } from 'react'

import Table from './SongTable'
import Button from '../MediaButton'
import Update from '../MediaUpdate'

export default function FormManager({ form }) {
  const [ song, setSong ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])

  const onClick = (selected) => {
    setSong(selected)
    console.log(selected)
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

  console.log(song.songname)

  const onSelected = () => {
    if(song.songid !== undefined && song.songid !== -1) return (
      <div>
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
          text='Actualziar'
        />
        <Button
          onClick={deleteSong}
          text='Eliminar'
        />
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
    console.log('hola')
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
    <div>
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