const express = require('express')
const pool = require('../database')

const router = express.Router()

/*
  Entrega los nombres de las playlist de cierto usuario, recibe
  {
    'username': 'ejemplo'
  }
  Devuelve una lista de objetos con la siguiente estructura
  {
    'playlistid': 0,
    'username': 'ejemplo',
    'playlistname': 'ejemplo'
  }
*/
router.get('/names', async (req, res) => {
  try {
    const { username } = req.body
    const playlists = await pool.query('SELECT * FROM userPlaylist WHERE username = $1', [username])
    res.json(playlists.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*
  Entrega las canciones de cierta playlist, que se manda por req
  {
    'playlistid': 0
  }
  Devuelve una lista de objetos con la siguiente estructura
  {
    'songid': 0,
    'songname': 'ejemplo',
    'active': true,
    'songlink': 'link',
    'albumid': 0,
    'author': 'ejemplo'
  }
*/
router.get('/songs', async (req, res) => {
  try {
    const { playlistid } = req.body
    const playlist = await pool.query('SELECT * FROM song WHERE songid IN (SELECT songid FROM playlistsongs WHERE playlistid = $1)', [playlistid])
    res.json(playlist.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*
  Ingresa una nueva cacncion a la playlist del usuario, que se manda por req
  {
    'playlistid': 0,
    'songid': 0
  }
  Devuelve un objeto con ERROR 201 si no se pudo completar agregar correctamente
  {
    'status': ''
  }
*/
router.post('/songs', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { playlistid, songid } = req.body
    if (playlistid !== undefined && songid !== undefined) {
      await pool.query('INSERT INTO playlistsongs (playlistid, songid) VALUES ($1, $2)', [playlistid, songid])
    } else {
      throw 'error'
    }
  } catch (error) {
    response.status = 'ERROR 201'
  } finally {
    res.json(response)
  }
})

/*
  Ingresa una nueva cacncion a la playlist del usuario, que se manda por req
  {
    'playlistid': 0,
    'songid': 0
  }
  Devuelve un objeto con ERROR 202 si no se pudo eliminar de la playlist
  {
    'status': ''
  }
*/
router.delete('/songs', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { playlistid, songid } = req.body
    if (playlistid !== undefined && songid !== undefined) {
      await pool.query('DELETE FROM playlistsongs WHERE playlistid = $1 AND songid = $2', [playlistid, songid])
    } else {
      throw 'error'
    }
  } catch (error) {
    response.status = 'ERROR 202'
  } finally {
    res.json(response)
  }
})

module.exports = router
