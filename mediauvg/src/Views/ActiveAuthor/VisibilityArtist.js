import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router';

import Table from '../../Components/Admin/ArtistTable'
import Button from '../../Components/MediaButton'
import Switch from '../../Components/Admin/Switch'

import './visibilityArtist.css'

export default function VisibilityArtist() {
  const history = useHistory()
  const location = useLocation()

  const [ artist, setArtist ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])

  const goBack = () => {
    history.goBack()
  }

  const onClick = (selected) => {
    setArtist(selected)
  }

  const onSetActive = (active) => {
    setArtist({
      ...artist,
      active: active
    })
  }
  //artist.active
  const onSelected = () => {
    if(artist.username !== undefined && artist.username !== '') return (
      <div>
        <Switch
          onChange={onSetActive}
          text='Active'
          active={true}
        />  
        <div id="navegador">
          <Button 
            onClick={updateArtist}
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
    fetch('http://localhost:3001/search/artist', 
    {method: 'GET', 
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      setRows(out)
    })
  }, [action])

  const updateArtist = () => {
    const data = { 
      artist: artist.artistname,
      active: artist.active,
      modifier: location.state.username,
    }

    // Se actualiza la informacion
    fetch('http://localhost:3001/edit/artist/visibility', 
    {method: 'POST', 
    body: JSON.stringify(data),
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out.status === 'DONE') {
        setArtist({})
        setAction(!action)
      }
    })

  }

  return (
    <div className="visibility_container">
      <Button 
        onClick={goBack}
        clase="active_goback"
        text='Atrás'
      />
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