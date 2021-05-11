import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';

import Table from '../AlbumTable'
import Button from '../../MediaButton'
import Switch from '../Switch'

import './activeAlbums.css'

export default function ActiveAlbum() {
  const [ album, setAlbum ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])
  const location = useLocation()

  const onClick = (selected) => {
    setAlbum(selected)
  }

  const onSetActive = (active) => {
    setAlbum({
      ...album,
      active: active
    })
  }

  const onSelected = () => {
    if(album.albumid !== undefined && album.albumid !== -1) return (
      <div>
        <Switch
          onChange={onSetActive}
          text='Active'
          active={album.active}
        /> 
        <div id="navegador">
          <Button 
            onClick={updateAlbum}
            clase="button"
            text='Actualizar'
          />
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
  }, [action])

  const updateAlbum = () => {
    const data = { 
      albumid: album.albumid,
      active: album.active,
      modifier: location.state.username,
    }

    // Se actualiza la informacion
    fetch('http://localhost:3001/edit/album/visibility', 
    {method: 'PUT', 
    body: JSON.stringify(data),
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
    <div className="visibility_container">
      <div className="active_container">
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