import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';

import Table from '../SongTable'
import Button from '../../MediaButton'
import Switch from '../Switch'

import './activeSong.css'

export default function ActiveSongs() {
  const [ song, setSong ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])
  const location = useLocation()

  const onClick = (selected) => {
    setSong(selected)
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
          <Button 
            onClick={updateSong}
            clase="button"
            text='Actualizar'
          />
        </div>
      </div>
    )
    return (
      <div></div>
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
  }, [action])

  const updateSong = () => {
    const data = { 
      songid: song.songid,
      active: song.active,
      modifier: location.state.username,
    }

    // Se actualiza la informacion
    fetch('http://localhost:3001/edit/song/visibility', 
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