const express = require('express')
const pool = require('../database')

const router = express.Router()

/*
  Permite habilitar una cancion del catalogo de musica, recibe
  {
    "songid": 0
  }
  Regresa un objeto con el status y ERROR 501 si no se logro hacer
  la instrucciom
*/
router.put('/enable', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { songid } = req.body
    await pool.query('UPDATE song SET active = true WHERE songid = $1', [songid])
  } catch (error) {
    response.status = 'ERROR 501'
  } finally {
    res.json(response)
  }
})

/*
  Permite habilitar una cancion del catalogo de musica, recibe
  {
    "songid": 0
  }
  Regresa un objeto con el status y ERROR 502 si no se logro hacer
  la instrucciom
*/
router.put('/disable', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { songid } = req.body
    await pool.query('UPDATE song SET active = false WHERE songid = $1', [songid])
  } catch (error) {
    response.status = 'ERROR 501'
  } finally {
    res.json(response)
  }
})

/*
  Permite modificar una cancion de la base de datos
  {
    "songid": 0,
    "songname": "ejemplo",
    "songlink": "ejemplo",
    "albumid": 0,
    "author": "ejemplo"
  }
  Regresa un objeto con el status y ERROR 503 si no se logro hacer
  la instrucciom
*/
router.put('/song', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      songid, songname, songlink, albumid, author,
    } = req.body
    await pool.query('UPDATE song SET songname = $1 songlink = $2 albumid = $3 author = $4 WHERE songid = $5',
      [songname, songlink, albumid, author, songid])
  } catch (error) {
    response.status = 'ERROR 503'
  } finally {
    res.json(response)
  }
})

/*
  Permite modificar una cancion de la base de datos
  {
    "albumid": 0,
    "albumname": "ejemplo",
    "author": "ejemplo",
    "release": "2000-12-12"
  }
  Regresa un objeto con el status y ERROR 504 si no se logro hacer
  la instrucciom
*/
router.put('/album', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      albumid, albumname, author, release,
    } = req.body
    await pool.query('UPDATE album SET albumname = $1 author = $2 release = $3 WHERE songid = $4',
      [albumname, author, release, albumid])
  } catch (error) {
    response.status = 'ERROR 503'
  } finally {
    res.json(response)
  }
})

/*
  Permite modificar una cancion de la base de datos
  {
    "username": "username",
    "artistname": "ejemplo",
    "startrecord": "2000-12-12"
  }
  Regresa un objeto con el status y ERROR 505 si no se logro hacer
  la instrucciom
*/
router.put('/artist', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      username, artistname, startrecord,
    } = req.body
    await pool.query('UPDATE artist SET artistname = $1 startrecord = $2 WHERE username = $3',
      [artistname, startrecord, username])
  } catch (error) {
    response.status = 'ERROR 505'
  } finally {
    res.json(response)
  }
})

/*
  Permite borrar una cancion de la base de datos
  {
    "songid": 0,
  }
  Regresa un objeto con el status y ERROR 506 si no se logro hacer
  la instrucciom
*/
router.delete('/song', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      songid,
    } = req.body
    await pool.query('DELETE FROM song WHERE songid = $1',
      [songid])
  } catch (error) {
    response.status = 'ERROR 506'
  } finally {
    res.json(response)
  }
})

/*
  Permite eliminar un album de la base de datos
  {
    "albumid": 0,
  }
  Regresa un objeto con el status y ERROR 507 si no se logro hacer
  la instrucciom
*/
router.delete('/album', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      albumid,
    } = req.body
    await pool.query('DELETE FROM album WHERE albumid = $1',
      [albumid])
  } catch (error) {
    response.status = 'ERROR 507'
  } finally {
    res.json(response)
  }
})

/*
  Permite eliminar un autor de la base de datos
  {
    "username": "ejemplo"
  }
  Regresa un objeto con el status y ERROR 508 si no se logro hacer
  la instrucciom
*/
router.delete('/artist', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      username,
    } = req.body
    await pool.query('DELETE FROM artist WHERE username = $1',
      [username])
  } catch (error) {
    response.status = 'ERROR 508'
  } finally {
    res.json(response)
  }
})

module.exports = router
