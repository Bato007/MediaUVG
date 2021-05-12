import React, { useState, useEffect } from 'react'

import Table from './AlbumTable'
import Button from '../MediaButton'
import '../songForm.css';
import { useLocation } from 'react-router';

export default function AlbumForm({ form }) {
  const [ album, setAlbum ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])
  const location = useLocation()

  const onClick = (selected) => {
    setAlbum(selected)
  }

  const onSelected = () => {
    if(album.albumid !== undefined && album.albumid !== -1) return (
      <div>
        <Button
          onClick={deleteAlbum}
          text='Eliminar'
          clase="button"
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
  }, [form, action])

  const deleteAlbum = () => {
    fetch('http://localhost:3001/admin/album', 
    {method: 'DELETE', 
    body: JSON.stringify({ ...album, modifier: location.satate.username }),
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out.status === '') {
        setAlbum({})
        setAction(!action)
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