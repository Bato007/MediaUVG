import React, { useState, useEffect } from 'react'

import Table from './ArtistTable'
import Button from '../MediaButton'
import Update from '../MediaUpdate'
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

  const onSetArtistName = (text) => {
    setArtist({
      ...artist,
      artistname: text
    })
  }


  const onSelected = () => {
    if(artist.username !== undefined && artist.username !== '') return (
      <div>
        <div id="navegador">
          <ul>
            <Update 
              onChange={onSetArtistName}
              placeholder={''}
              limit={20}
              type='text'
              value={artist.artistname}
            />      
            <Button 
              onClick={updateArtist}
              clase="button"
              text='Actualizar'
            />
            <Button
              onClick={deleteArtist}
              text='Eliminar'
              clase="button"
            />
          </ul>
        </div>
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

  const updateArtist = () => {
    const data = { 
      username: artist.username,
      artistname: artist.artistname,
      modifier: location.state.username,
    }

    // Se actualiza la informacion
    fetch('http://localhost:3001/admin/artist', 
    {method: 'PUT', 
    body: JSON.stringify(data),
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

  const deleteArtist = () => {
    fetch('http://localhost:3001/admin/artist', 
    {method: 'DELETE', 
    body: JSON.stringify(artist),
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