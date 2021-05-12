import React, { useState, useEffect } from 'react'

import Table from '../AlbumTable'
import Button from '../../MediaButton'
import Update from '../../MediaUpdate'

import './editeAlbum.css'

export default function ActiveAlbum({ username }) {
  const [ album, setAlbum ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])

  const onClick = (selected) => {
    setAlbum(selected)
  }

  const onSetAlbum = (text) => {
    setAlbum({
      ...album,
      albumname: text
    })
  }

  const onSetAuthor = (text) => {
    setAlbum({
      ...album,
      author: text
    })
  }

  const onSetDate = (text) => {
    setAlbum({
      ...album,
      release: text
    })
  }

  const onSelected = () => {
    if(album.albumid !== undefined && album.albumid !== -1) return (
      <div className="divitppap"> 
        <div>
          <Update 
            onChange={onSetAlbum}
            placeholder={''}
            limit={20}
            type='text'
            value={album.albumname}
          />
          <Update 
            onChange={onSetAuthor}
            placeholder={''}
            limit={20}
            type='text'
            value={album.author}
          />
          <Update 
            onChange={onSetDate}
            placeholder={''}
            limit={20}
            type='text'
            value={album.release.substring(0, 10)}
          />   
        </div>
        <Button 
          onClick={updateAlbum}
          clase="button"
          text='Actualizar'
        />
      </div>
    )
  }

  useEffect(() => {
    fetch('http://localhost:3001/search/album', 
    {method: 'GET', 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      setRows(out)
    })
  }, [action])

  const updateAlbum = () => {
    // Se actualiza la informacion
    fetch('http://localhost:3001/edit/album', 
    {method: 'POST', 
    body: JSON.stringify({ ...album, modifier: username }),
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out.status === 'DONE') {
        setAlbum({})
        setAction(!action)
      }
    })
  }

  return (
    <div className="edite_album_container">
      <div className="edite_album_subcontainer">
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