const express = require('express')
const pool = require('../database')

const router = express.Router()

/*
  Retorna un array de canciones con ese nombre, formato
  {
    'song': 'ejemplo'
  }
*/
router.put('/song', async (req, res) => {
  try {
    const { song } = req.body
    const songs = await pool.query('SELECT * FROM song WHERE songname = $1', [song])
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
    'album': 'ejemplo'
  }
*/
router.get('/album', async (req, res) => {
  try {
    const { album } = req.body
    const songs = await pool.query('SELECT * FROM song WHERE albumID IN (SELECT albumid FROM album WHERE albumname = $1)', [album])
    res.json(songs.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*
  Retorna un array de canciones con ese genero, formato
  {
    'genre': 'ejemplo'
  }
*/
router.get('/genre', async (req, res) => {
  try {
    const { genre } = req.body
    const songs = await pool.query('SELECT * FROM song WHERE songId IN (SELECT songId FROM genre WHERE songgenre = $1) AND active = true', [genre])
    res.json(songs.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

/*
  Retorna un array de canciones de este artista, formato
  {
    'author': 'ejemplo'
  }
*/
router.get('/artist', async (req, res) => {
  try {
    const { author } = req.body
    const songs = await pool.query('SELECT * FROM song WHERE author IN (SELECT artistname FROM artist WHERE artistname = $1)', [author])
    res.json(songs.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

module.exports = router
