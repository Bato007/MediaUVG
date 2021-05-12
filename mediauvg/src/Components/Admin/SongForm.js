import React, { useState, useEffect } from 'react'

import Table from './SongTable'
import Button from '../MediaButton'
import '../songForm.css';
import { useLocation } from 'react-router'

export default function SongFomr({ form }) {
  const [ song, setSong ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])
  const location = useLocation()

  const onClick = (selected) => {
    setSong(selected)
  }

  const onSelected = () => {
    if(song.songid !== undefined && song.songid !== -1) return (
      <Button
        onClick={deleteSong}
        text='Eliminar'
        clase="button"
      />
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

  const deleteSong = () => {
    fetch('http://localhost:3001/admin/song', 
    {method: 'DELETE', 
    body: JSON.stringify({ ...song, modifier: location.satate.username }),
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out.status === '') {
        setSong({})
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
  )
}