const express = require('express')
const pool = require('../database')

const router = express.Router()

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    "username": "ejemplo",
    "password": "ejemplo"
  }
  Al recibirlo verifica si esta en la base de datos si no esta
  manda manda ERROR 101, si las contraseñas no coinciden manda
  ERROR 102 de la siguiente manera:
  {
    "username": "ERROR 102",
    "password": "",
    "name": "",
    "playback": 0,
    "admin": false
  }
  Si no hay errores entonces manda la información con el mismo formato.
*/
router.post('/verify', async (req, res) => {
  try {
    console.log(req.body)
    const { username, password } = req.body
    const user = await pool.query('SELECT * FROM swapuser WHERE username = $1', [username])
    const err = {
      username: 'ERROR 101',
      password: '',
      name: '',
      playback: 0,
      admin: false,
    }
    if (user.rows.length > 0) {
      if (user.rows[0].password === password) {
        let premium = false
        const free = await pool.query('SELECT * FROM freeuser WHERE username = $1', [username])
        if (free.rowCount < 1) {
          premium = true
        }
        user.rows[0] = { premium, ...user.rows[0] }
        res.json(user.rows)
      } else {
        err.username = 'ERROR 102'
        res.json(err)
      }
    } else {
      res.json(err)
    }
  } catch (error) {
    console.error(error.messasge)
    console.log('ahh perro')
  }
})

module.exports = router
