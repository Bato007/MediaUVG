import React, { useState, useEffect } from 'react'

import Table from '../SongTable'
import Button from '../../MediaButton'
import Update from '../../MediaUpdate'

import './EditSong.css'

export default function EditSong({ username }) {
  const [ song, setSong ] = useState({})
  const [ action, setAction ] = useState(false)
  const [ page, setPage ] = useState(0)
  const [ rows, setRows ] = useState([])

  const onClick = (selected) => {
    setSong(selected)
  }


  const onSetSong = (text) => {
    setSong({
      ...song,
      songname: text
    })
  }

  const onSetAlbum = (text) => {
    setSong({
      ...song,
      albumname: text
    })
  }

  const onSetAuthor = (text) => {
    setSong({
      ...song,
      author: text
    })
  }

  const onSetLink = (text) => {
    setSong({
      ...song,
      songname: text
    })
  }


  const onSetGenre = (genre) => {
    setSong({
      ...song,
      genres: genre
    })
  }


  const onSelected = () => {
    if(song.songid !== undefined && song.songid !== -1) return (
      <div>
        <div>
          <div className="editseccontainer">
            <Update 
              onChange={onSetSong}
              placeholder={''}
              limit={20}
              type='text'
              value={song.songname}
            />
            <Update 
              onChange={onSetAlbum}
              placeholder={''}
              limit={20}
              type='text'
              value={song.albumname}
            />
          </div>
          <div className="editseccontainer">
            <Update 
              onChange={onSetAuthor}
              placeholder={''}
              limit={20}
              type='text'
              value={song.author}
            />
            <Update 
              onChange={onSetLink}
              placeholder={''}
              limit={20}
              type='text'
              value={song.songlink}
            />
          </div>
          <div className="editseccontainer">
            <Update 
              onChange={onSetGenre}
              placeholder={''}
              limit={20}
              type='text'
              value={song.genres}
            />
          </div>
        </div>
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

    // Se actualiza la informacion
    fetch('http://localhost:3001/edit/song', 
    {method: 'POST', 
    body: JSON.stringify({...song, modifier:username}),
    headers:{'Content-Type': 'application/json'}})
    .then((res) => res.json())
    .catch((error) =>  console.error('Error', error))
    .then((out) => {
      if (out.status === 'DONE') {
        setSong({})
        setAction(!action)
      }
    })

  }

  return (
    <div className="highest_div">
      <div className="second_div">
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