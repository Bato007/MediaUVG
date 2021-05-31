const express = require('express')
const Joi = require('joi')
const { MongoClient } = require('mongodb')
const pool = require('../database')

const router = express.Router()

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, { useUnifiedTopology: true })

/**
 * Errores que tira:
 * Si date no se encuentra: \"date\" is required
 * Si date es invalida: \"date\" must be a valid date
 */
router.post('/migrate', async (req, res) => {
  const schema = Joi.object({
    date: Joi.date().iso().required(),
  })

  const validation = schema.validate(req.body)
  if (validation.error) {
    const { message } = validation.error.details[0]
    res.status(400).json({ message })
  }
  const { date } = req.body

  try {
    // Base de Datos no relacional
    await client.connect()
    const usersDC = client.db('swap').collection('users')

    const tempUsers = await pool.query(`
      SELECT DISTINCT username
      FROM user_plays
      WHERE fecha = $1;
    `, [date])

    const users = tempUsers.rows

    users.forEach(async (user) => {
      const { username } = user
      const tempSongs = await pool.query(`
        SELECT songid, songname, songgenre, count
        FROM user_plays
        WHERE fecha = $1
        AND username = $2;
      `, [date, username])

      const songs = tempSongs.rows

      // Buscar al user
      const searched = await usersDC.findOne({ username })

      // Si es null insertarlo
      if (searched) {
        const hasDate = await usersDC.findOne({ username: 'bato007', 'history.fecha': date })
        // Si no se encuentra insertar
        if (hasDate) {
          // Si se encontro entonces se tienen que remplazar solo los songs
          await usersDC.updateOne({
            username,
            'history.fecha': date,
          }, {
            $unset: {
              'history.$.songs': [],
            },
          }, {
            multi: true,
          })

          // Insertando todos los datos
          songs.forEach(async (song) => {
            await usersDC.updateOne({
              username,
              'history.fecha': date,
            }, {
              $push: {
                'history.$.songs': song,
              },
            }, {
              mutli: true,
            })
          })
        } else { // No se encuentra se pushean los songs
          await usersDC.updateOne({ username },
            {
              $push: {
                history: {
                  fecha: date,
                  songs,
                },
              },
            }, {
              multi: true,
            })
        }
      } else { // Mete las nuevas canciones
        // Crea la nueva entidad
        const newEntry = {
          username,
          history: [
            {
              fecha: date,
              songs,
            },
          ],
        }
        await usersDC.insertOne(newEntry)
      }
    })
    res.json({ message: 'DONE' })
  } catch (error) {
    console.log(error.message)
    res.json({ message: 'ERROR' })
  }
})

/**
 * Errores que tira:
 * Si date no se encuentra: \"date\" is required
 * Si date es invalida: \"date\" must be a valid date
 */
router.post('/migrate/from', async (req, res) => {
  const schema = Joi.object({
    date: Joi.date().iso().required(),
  })

  const validation = schema.validate(req.body)
  if (validation.error) {
    const { message } = validation.error.details[0]
    res.status(400).json({ message })
  }
  const aux = req.body.date

  try {
    // Base de Datos no relacional
    await client.connect()
    const usersDC = client.db('swap').collection('users')

    const tempDates = await pool.query(`
      SELECT DISTINCT to_char(fecha, 'YYYY-MM-DD') AS date
      FROM user_plays
      WHERE fecha <= $1;
    `, [aux])
    const dates = tempDates.rows
    dates.forEach(async (dateT) => {
      const { date } = dateT

      const tempUsers = await pool.query(`
        SELECT DISTINCT username
        FROM user_plays
        WHERE fecha = $1;
      `, [date])

      const users = tempUsers.rows

      users.forEach(async (user) => {
        const { username } = user
        const tempSongs = await pool.query(`
          SELECT songid, songname, songgenre, count
          FROM user_plays
          WHERE fecha = $1
          AND username = $2;
        `, [date, username])

        const songs = tempSongs.rows

        // Buscar al user
        const searched = await usersDC.findOne({ username })

        // Si es null insertarlo
        if (searched) {
          const hasDate = await usersDC.findOne({ username: 'bato007', 'history.fecha': date })
          // Si no se encuentra insertar
          if (hasDate) {
            // Si se encontro entonces se tienen que remplazar solo los songs
            await usersDC.updateOne({
              username,
              'history.fecha': date,
            }, {
              $unset: {
                'history.$.songs': [],
              },
            }, {
              multi: true,
            })

            // Insertando todos los datos
            songs.forEach(async (song) => {
              await usersDC.updateOne({
                username,
                'history.fecha': date,
              }, {
                $push: {
                  'history.$.songs': song,
                },
              }, {
                mutli: true,
              })
            })
          } else { // No se encuentra se pushean los songs
            await usersDC.updateOne({ username },
              {
                $push: {
                  history: {
                    fecha: date,
                    songs,
                  },
                },
              }, {
                multi: true,
              })
          }
        } else { // Mete las nuevas canciones
        // Crea la nueva entidad
          const newEntry = {
            username,
            history: [
              {
                fecha: date,
                songs,
              },
            ],
          }
          await usersDC.insertOne(newEntry)
        }
      })
    })
    res.json({ message: 'DONE' })
  } catch (error) {
    console.log(error.message)
    res.json({ message: 'ERROR' })
  }
})

router.post('/report', async (req, res) => {
  const schema = Joi.object({
    date: Joi.date().iso().required(),
  })

  const validation = schema.validate(req.body)
  if (validation.error) {
    const { message } = validation.error.details[0]
    res.status(400).json({ message })
  }
  const { date } = req.body

  try {
    await client.connect()
    const usersDC = client.db('swap').collection('users')

    // Obtener 10 usuarios
    const randomUsers = await usersDC.aggregate([
      { $sample: { size: 10 } },
    ])
    console.log(randomUsers)
    const usernames = []
    randomUsers.forEach((user) => {
      usernames.push(user.username)
    })

    res.json({ message: 'DONE' })
  } catch (error) {
    console.log(error.message)
    res.json({ message: 'ERROR' })
  }
})

module.exports = router
