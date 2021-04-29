const express = require('express')
const pool = require('../database')

const router = express.Router()
/*
  const data = {
    songname,
    songalbum,
    songlink,
    username
  }
*/
router.post('/song', async (req, res) => {
  const status = {
    status: '',
  }
  try {
    const {
      songname, songlink, songalbum, artistname,
    } = req.body
    await pool.query('INSERT INTO song (songName, active, songLink, albumId, author) VALUES ($1, true, $2, (SELECT albumid FROM album WHERE albumname = $3 AND author = $4), $4)',
      [songname, songlink, songalbum, artistname])
  } catch (error) {
    console.error(error)
    status.status = 'ERROR'
  } finally {
    res.json(status)
  }
})

router.post('/album', async (req, res) => {
  const status = {
    status: '',
  }
  try {
    const {
      albumname, fecha, artistname,
    } = req.body
    await pool.query('INSERT INTO album (albumName, author, release) VALUES ($1, $2, $3)',
      [albumname, artistname, fecha])
  } catch (error) {
    console.error(error)
    status.status = 'ERROR'
  } finally {
    res.json(status)
  }
})

router.post('/playlist', async (req, res) => {
  const status = {
    status: '',
  }
  try {
    const { username, newPlaylist } = req.body
    await pool.query('INSERT INTO userplaylist (username, playlistname) VALUES ($1, $2)',
      [username, newPlaylist])
  } catch (error) {
    console.error(error)
    status.status = 'ERROR'
  } finally {
    res.json(status)
  }
})

router.post('/addPlay', async (req, res) => {
  const status = {
    status: '',
  }
  try {
    const { playlistid, songid } = req.body
    await pool.query('INSERT INTO playlistSongs (playlistId, songId) VALUES ($1, $2)', [playlistid, songid])
  } catch (error) {
    console.error(error)
    status.status = 'ERROR'
  } finally {
    res.json(status)
  }
})

module.exports = router
