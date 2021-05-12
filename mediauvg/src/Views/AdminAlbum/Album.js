/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import './Albumm.css'
import Table from '../../Components/Admin/AlbumTable'
import Button from '../../Components/MediaButton'
import Update from '../../Components/MediaUpdate'

export default function AlbumEdit() {
  const history = useHistory()
  const location = useLocation()

  const [ album, setAlbum ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])
  const username = location.state

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

  // Para regresar al pasado
  const goBack = () => {
    history.goBack(location.state)
  }

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
      <div>
        <div className="updaters">
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
        <div className="middle">
          <Button 
            onClick={updateAlbum}
            clase="button"
            text='Actualizar'
          />
        </div>
      </div>
    )
  }

  const updateAlbum = () => {
    const data = { 
      ...album,
      modifier: username,
    }

    // Se actualiza la informacion
    fetch('http://localhost:3001/edit/album', 
    {method: 'POST', 
    body: JSON.stringify(data),
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
      <div className="album_container">
          <Button
            onClick={goBack}
            text='Atras'
            clase="album_goback"
          />  
        <div className="album_containers">
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
