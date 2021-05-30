const express = require('express')
const Joi = require('joi')
const pool = require('../database')

const router = express.Router()

const generate = (list, size) => {
  const finalList = []
  let index = 0
  for (let i = 0; i < size; i += 1) {
    index = Math.floor(Math.random() * list.length)
    finalList.push(list[index])
  }
  return finalList
}

/**
 * Errores que tira:
 * Si date no se encuentra: \"date\" is required
 * Si no hay tracks: \"tracks\" is required
 * Si no hay reproductions: \"reproductions\" is required
 * Si date es invalida: \"date\" must be a valid date
 * Si el track es negativo: \"tracks\" must be greater than or equal to 0
 * Si reproductions son negativos: \"reproductions\" must be greater than or equal to 0
 */
router.post('/create', async (req, res) => {
  const schema = Joi.object({
    date: Joi.date().required(),
    tracks: Joi.number().min(0).required(),
    reproductions: Joi.number().min(0).required(),
  })

  // Validando la informacion
  const validation = schema.validate(req.body)
  if (validation.error) {
    const { message } = validation.error.details[0]
    res.status(400).json({ message })
  }
  const { date, tracks, reproductions } = req.body
  const genres = ['rock', 'pop', 'jazz', 'reggeaton', 'disco',
    'blues', 'electro', 'heavy metal']

  const client = await pool.connect()
  try {
    // Crear las canciones
    client.query(`
      BEGIN;
    `)
    // 'test-song', true, 'test', 25, 'test', 0
    const songs = await client.query(`
      SELECT * FROM create_songs($1)
    `, [tracks])
    const { rows } = songs
    const ids = []

    for (let i = 0; i < rows.length; i += 1) {
      const { songid } = rows[i]
      ids.push(songid)
    }

    // Agregando los generos
    const insertGenres = generate(genres, songs.rowCount)
    await client.query(`
      SELECT * FROM insert_genres($1, $2, $3)
    `, [ids, insertGenres, ids.length])

    // Agregar las plays [ { songid: 1, plays: 323}, ]
    const swapusers = await client.query(`
      SELECT username FROM swapuser
    `)
    const swapRow = swapusers.rows
    const usernames = []

    for (let i = 0; i < swapRow.length; i += 1) {
      const { username } = swapRow[i]
      usernames.push(username)
    }

    const randomUsers = generate(usernames, reproductions)
    const plays = generate(ids, reproductions)

    await client.query(`
      SELECT simulate_plays($1, $2, $3, $4)
    `, [plays, randomUsers, plays.length, date])

    client.query(`
      COMMIT;
    `)
    res.json({ message: 'DONE' })
  } catch (error) {
    res.status(400).json(error.message)
    client.query(`
      ROLLBACK;
    `)
  }
})

/**
 * Errores que tira:
 * Si date no se encuentra: \"date\" is required
 * Si no hay tracks: \"tracks\" is required
 * Si no hay reproductions: \"reproductions\" is required
 * Si date es invalida: \"date\" must be a valid date
 * Si el track es negativo: \"tracks\" must be greater than or equal to 0
 * Si reproductions son negativos: \"reproductions\" must be greater than or equal to 0
 */
router.post('/play', async (req, res) => {
  const schema = Joi.object({
    date: Joi.date().required(),
    tracks: Joi.number().min(0).required(),
    reproductions: Joi.number().min(0).required(),
  })

  // Validando la informacion
  const validation = schema.validate(req.body)
  if (validation.error) {
    const { message } = validation.error.details[0]
    res.status(400).json({ message })
  }
  const { date, tracks, reproductions } = req.body

  const client = await pool.connect()
  try {
    // Crear las canciones
    client.query(`
      BEGIN;
    `)

    // Obteniendo los ids
    const tempSongs = await client.query(`
      SELECT songid FROM song;
    `)
    const tempIds = []
    for (let i = 0; i < tempSongs.rowCount; i += 1) {
      tempIds.push(tempSongs.rows[i].songid)
    }

    // Generando los ids
    const ids = generate(tempIds, tracks)
    // Agregar las plays [ { songid: 1, plays: 323}, ]
    const swapusers = await client.query(`
      SELECT username FROM swapuser;
    `)
    const swapRow = swapusers.rows
    const usernames = []

    for (let i = 0; i < swapRow.length; i += 1) {
      const { username } = swapRow[i]
      usernames.push(username)
    }

    const randomUsers = generate(usernames, reproductions)
    const plays = generate(ids, reproductions)

    await client.query(`
      SELECT simulate_plays($1, $2, $3, $4)
    `, [plays, randomUsers, plays.length, date])

    client.query(`
      COMMIT;
    `)
    res.json({ message: 'DONE' })
  } catch (error) {
    res.status(400).json(error.message)
    client.query(`
      ROLLBACK;
    `)
  }
})

module.exports = router
