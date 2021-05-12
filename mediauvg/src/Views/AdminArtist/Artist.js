/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './Artist.css'
import Table from '../../Components/Admin/ArtistTable'
import Button from '../../Components/MediaButton'
import Update from '../../Components/MediaUpdate'

export default function ArtistEdit() {
  const history = useHistory()
  const location = useLocation()

  const [ artist, setArtist ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])
  const username = location.state

  useEffect(() => {
    fetch('http://localhost:3001/search/artist', 
    {method: 'GET', 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      setRows(out)
    })
  }, [action])

  // Para regresar al pasado
  const goBack = () => {
    history.goBack(location.state)
  }

  const onClick = (selected) => {
    setArtist(selected)
  }

  const onSetArtist = (text) => {
    setArtist({
      ...artist,
      artistname: text
    })
  }


  const onSelected = () => {
    if(artist.username !== undefined && artist.username !== '') return (
      <div>
        <div className="updaters">
          <Update 
            onChange={onSetArtist}
            placeholder={''}
            limit={20}
            type='text'
            value={artist.artistname}
          />
        </div>
        <div className="middle">
          <Button 
            onClick={updateArtist}
            clase="button"
            text='Actualizar'
          />
        </div>
      </div>
    )
  }

  const updateArtist = () => {
    const data = { 
      username: artist.username,
      artistname: artist.artistname,
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

  return (
      <div className="artist_container">
          <Button
            onClick={goBack}
            text='Atras'
            clase="artist_goback"
          />  
        <div className="artist_containers">
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
