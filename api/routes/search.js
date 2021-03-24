const express = require('express')
const pool = require('../database')

const router = express.Router()

/*
  Retorna un array de canciones con ese nombre, formato
  {
    'value': 'ejemplo'
  }
*/
router.post('/song', async (req, res) => {
  try {
    const { value } = req.body
    const songs = await pool.query('SELECT * FROM song WHERE songname = $1', [value])
    res.json(songs.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*
  Retorna un array de canciones que pertenecen a ese album, formato
  {
    'search': 'ejemplo'
  }
*/
router.post('/album', async (req, res) => {
  try {
    const { value } = req.body
    const songs = await pool.query('SELECT * FROM song WHERE albumID IN (SELECT albumid FROM album WHERE albumname = $1)', [value])
    res.json(songs.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*
  Retorna un array de canciones con ese genero, formato
  {
    'searchSong': 'ejemplo'
  }
*/
router.post('/genre', async (req, res) => {
  try {
    const { value } = req.body
    const songs = await pool.query('SELECT * FROM song WHERE songId IN (SELECT songId FROM genre WHERE songgenre = $1) AND active = true', [value])
    res.json(songs.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*
  Retorna un array de canciones de este artista, formato
  {
    'searchSong': 'ejemplo'
  }
*/
router.post('/artist', async (req, res) => {
  try {
    const { value } = req.body
    const songs = await pool.query('SELECT * FROM song WHERE author IN (SELECT artistname FROM artist WHERE artistname = $1)', [value])
    res.json(songs.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*
  Retorna un array de canciones con ese nombre, formato
  {
    'song': 'ejemplo'
  }
*/
router.get('/song', async (req, res) => {
  try {
    const songs = await pool.query('SELECT * FROM (song NATURAL JOIN album) P1')
    res.json(songs.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*
  Retorna un array de canciones que pertenecen a ese album, formato
  {
    'search': 'ejemplo'
  }
*/
router.get('/album', async (req, res) => {
  try {
    const albums = await pool.query('SELECT * FROM album')
    res.json(albums.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*
  Retorna un array de canciones de este artista, formato
  {
    'searchSong': 'ejemplo'
  }
*/
router.get('/artist', async (req, res) => {
  try {
    const artists = await pool.query('SELECT * FROM artist')
    res.json(artists.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

router.post('/playlist', async (req, res) => {
  try {
    const { username } = req.body
    const artists = await pool.query('SELECT * FROM userplaylist WHERE username = $1', [username])
    res.json(artists.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*

*/
router.post('/play', async (req, res) => {
  try {
    const { songId } = req.body
    const song = await pool.query('SELECT * FROM song WHERE songid = $1', [songId])
    res.json(song.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

module.exports = router
