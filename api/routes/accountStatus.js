const express = require('express')
const pool = require('../database')

const router = express.Router()

/*
  Le permite al usuario ser premium, se necesita un req
  {
    "username": "ejemplo"
  }
  Del cual se respondera con un objeto de la siguiente forma
  {
    "status": "ejemplo"
  }
  Si hubo un error, se enviara ERROR 301 en vez del espacio en blanco
*/
router.post('/gopremium', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { username } = req.body
    if (username !== undefined) {
      const today = new Date()
      const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDay()}`
      await pool.query('DELETE FROM freeUser WHERE username = $1', [username])
      await pool.query('INSERT INTO premiumUser (username, subscription) VALUES ($1, $2)', [username, date])
    } else {
      throw 'error'
    }
  } catch (error) {
    response.status = 'ERROR 301'
  } finally {
    res.json(response)
  }
})

/*
  Le permite al usuario cancelar lo premium, se necesita un req
  {
    "username": "ejemplo"
  }
  Del cual se respondera con un objeto de la siguiente forma
  {
    "status": ""
  }
  Si hubo un error, se enviara ERROR 302 en vez del espacio en blanco
*/
router.post('/cancelpremium', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { username } = req.body
    if (username !== undefined) {
      const today = new Date()
      const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDay()}`
      await pool.query('DELETE FROM premiumuser WHERE username = $1', [username])
      await pool.query('INSERT INTO freeuser (username, playbackLeft, lastPlay) VALUES ($1, $2, $3)', [username, 3, date])
    } else {
      throw 'error'
    }
  } catch (error) {
    response.status = 'ERROR 302'
  } finally {
    res.json(response)
  }
})

/*
  Le permite al usuario ser artista, se necesita un req
  {
    "username": "ejemplo",
    "artistname": "ejemplo"
  }
  Del cual se respondera con un objeto de la siguiente forma
  {
    "status": "ejemplo"
  }
  Si hubo un error, se enviara ERROR 303 en vez del espacio en blanco
*/
router.post('/goauthor', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { username, artistname } = req.body
    if (username !== undefined) {
      const today = new Date()
      const date = `${today.getFullYear()}-${(today.getMonth() + 1)}-${today.getDay()}`
      await pool.query('INSERT INTO artist (username, artistname, playbackThreeMonths, playbackSixMonths, startRecord) VALUES ($1, $2, $3, $4, $5)', [username, artistname, 0, 0, date])
    } else {
      throw 'error'
    }
  } catch (error) {
    response.status = 'ERROR 303'
  } finally {
    res.json(response)
  }
})

/*
  Le permite al usuario ya no ser artista, se necesita un req
  {
    "username": "ejemplo"
  }
  Del cual se respondera con un objeto de la siguiente forma
  {
    "status": "ejemplo"
  }
  Si hubo un error, se enviara ERROR 304 en vez del espacio en blanco
*/
router.delete('/goauthor', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { username } = req.body
    if (username !== undefined) {
      await pool.query('DELETE FROM artist WHERE username = $1', [username])
    } else {
      throw 'error'
    }
  } catch (error) {
    response.status = 'ERROR 304'
  } finally {
    res.json(response)
  }
})

router.put('/canhear', async (req, res) => {
  try {
    const { username } = req.body
    const info = await pool.query('SELECT playbackleft, lastPlay FROM freeuser WHERE username = $1', [username])
    res.json(info.rows)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
