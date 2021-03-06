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
    const songs = await pool.query('SELECT * FROM song WHERE songname = $1 AND active = true', [value])
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
    const songs = await pool.query('SELECT * FROM song WHERE albumID IN (SELECT albumid FROM album WHERE albumname = $1) AND active = true', [value])
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
    const songs = await pool.query('SELECT * FROM song WHERE author IN (SELECT artistname FROM artist WHERE artistname = $1) AND active = true', [value])
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
    const songs = await pool.query(`
      SELECT author, songid, songname, active, songlink, albumname, ARRAY_AGG(songgenre) AS genres
      FROM (song NATURAL JOIN 
          (SELECT albumid, albumname, author, release 
          FROM album) P2) P1 INNER JOIN genre USING(songid)
      GROUP BY author, songid, songname, active, songlink, albumname;    
    `)
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

router.get('/freeuser', async (req, res) => {
  try {
    const freeusers = await pool.query(`
      SELECT username, active
      FROM (swapuser LEFT JOIN freeuser USING(username))
      WHERE admin = false
      AND active IS NOT null;    
    `)
    res.json(freeusers.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

router.get('/premium', async (req, res) => {
  try {
    const premium = await pool.query(`
      SELECT username
      FROM (swapuser NATURAL JOIN premiumuser)
      WHERE admin = false; 
    `)
    res.json(premium.rows)
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

router.post('/playlist/songs', async (req, res) => {
  try {
    const { playlistid } = req.body
    const songs = await pool.query('SELECT * FROM song WHERE songid IN (SELECT songid FROM playlistsongs WHERE playlistid = $1)', [playlistid])
    res.json(songs.rows)
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

router.post('/sumar', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { songId, username } = req.body
    await pool.query(`
      BEGIN;
    `)
    await pool.query(`
      UPDATE swapuser SET 
      playback = playback + 1 
      WHERE username = $1;
    `, [username])
    await pool.query(`
      SELECT * 
      FROM add_play($1);
    `, [songId])
    await pool.query(`
      COMMIT;
    `)
    response.status = 'DONE'
  } catch (err) {
    await pool.query(`
      ROLLBACK;
    `)
    response.status = 'ERROR'
  } finally {
    res.json(response)
  }
})

module.exports = router
