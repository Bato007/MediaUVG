import React, { useState, useEffect } from 'react'

import Table from './ArtistTable'
import Button from '../MediaButton'
import '../songForm.css';
import { useLocation } from 'react-router';

export default function ArtistForm({ form }) {
  const [ artist, setArtist ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])
  const location = useLocation()

  const onClick = (selected) => {
    setArtist(selected)
  }

  const onSelected = () => {
    if(artist.username !== undefined && artist.username !== '') return (
      <div>
        <Button
          onClick={deleteArtist}
          text='Eliminar'
          clase="button"
        />
      </div>
    )
  }

  useEffect(() => {
    fetch('http://localhost:3001/search/artist', 
    {method: 'GET', 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      setRows(out)
    })
  }, [form, action])

  const deleteArtist = () => {
    fetch('http://localhost:3001/admin/artist', 
    {method: 'DELETE', 
    body: JSON.stringify({ ...artist, modifier: location.satate.username }),
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out.status === '') {
        setArtist({})
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