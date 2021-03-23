import React, { useState, useEffect } from 'react'

import Table from './AlbumTable'
import Button from '../MediaButton'
import Update from '../MediaUpdate'
import '../songForm.css';

export default function AlbumForm({ form }) {
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


  const onSelected = () => {
    if(album.albumid !== undefined && album.albumid !== -1) return (
      <div>
        <div id="navegador">
          <ul>
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
              onChange={onSetAuthor}
              placeholder={''}
              limit={20}
              type='text'
              value={album.release}
            />          
            <Button 
              onClick={updateAlbum}
              clase="button"
              text='Actualizar'
            />
            <Button
              onClick={deleteAlbum}
              text='Eliminar'
              clase="button"
            />
          </ul>
        </div>
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
  }, [form, action])

  const updateAlbum = () => {
    const data = { 
      albumid: album.albumid,
      albumname: album.albumname,
      release: album.release,
      author: album.author,
    }

    // Se actualiza la informacion
    fetch('http://localhost:3001/admin/album', 
    {method: 'PUT', 
    body: JSON.stringify(data),
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out.status === '') {
        setAlbum({})
        setAction(!action)
      } else {
        console.log('No Update')
      }
    })

  }

  const deleteAlbum = () => {
    fetch('http://localhost:3001/admin/album', 
    {method: 'DELETE', 
    body: JSON.stringify(album),
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out.status === '') {
        setAlbum({})
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