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
  ERROR 102 y si el usuario esta inactivo manda ERROR 103
  la siguiente manera:
  {
    "username": "ERROR 102",
    "password": "",
    "name": "",
    "playback": 0,
    "admin": false,
    "premium": false,
    "artist": false,
    "artistname": "",
    "active": false,
  }
  Si no hay errores entonces manda la información con el mismo formato.
*/
router.post('/verify', async (req, res) => {
  const err = {
    username: 'ERROR 101',
    password: '',
    name: '',
    playback: 0,
    admin: false,
    premium: false,
    artist: false,
    artistname: '',
    active: false,
  }
  try {
    const { username, password } = req.body
    const user = await pool.query(`
      SELECT * 
      FROM swapuser 
      WHERE username = $1
      `, [username])
    let active = true
    let artistname = ''

    // Verifica que si exista el usuario
    if (user.rows.length > 0) {
      if (user.rows[0].password === password) {
        let premium = false
        let artist = false

        // Verificando si es premium o no
        const free = await pool.query(`
          SELECT * 
          FROM freeuser 
          WHERE username = $1
          `, [username])

        // Obteniendo si es autor o no
        const author = await pool.query(`
          SELECT * 
          FROM artist 
          WHERE username = $1                                
          `, [username])

        // Verificando cuantas si son premium y si estan activos
        if (free.rowCount < 1) {
          premium = true
        } else {
          const activeUser = await pool.query(`
            SELECT *
            FROM freeuser
            WHERE username = $1
          `, [username])
          active = activeUser.rows[0].active

          // Si no esta activo tirar error
          if (!active) {
            err.username = 'ERROR 103'
            throw 'No esta activo'
          }
        }

        if (author.rowCount > 0) {
          artist = true
          artistname = author.rows[0].artistname
        }

        // Creando el nuevo objeto
        user.rows[0] = {
          premium, artist, artistname, ...user.rows[0],
        }
        res.json(user.rows)
      } else {
        err.username = 'ERROR 102'
      }
    } else {
      throw 'No existe el username'
    }
  } catch (error) {
    res.json(err)
  }
})

/*
  Esta funcion recibe un Json con el siguiente formato:
  {
    "username": "ejemplo",
    "password": "ejemplo",
    "confirm": "ejemplo",
    "name": "ejemplo"
  }
  Al recibirlo verifica si el username esta libre, sino retorna
  ERROR 104, luego verifica que las contraseñas sean las mismas
  de lo contrario retorna ERROR 105, si hubo un problema al momento
  de insertar da el ERROR 106 y luego devuleve un objeto de
  la siguiente manera:
  {
    "created": "ERROR 104",
  }
  Si no hay errores entonces manda asi:
  {
    "created": "DONE"
  }
*/
router.post('/register', async (req, res) => {
  const response = {
    created: 'ERROR 104',
  }
  let finsert

  try {
    const {
      username, password, confirm, name,
    } = req.body

    const flag = await pool.query(`
      SELECT *
      FROM swapuser
      WHERE username = $1
    `, [username])

    // Sino hay más entonces se agrega a la base de datos
    if (flag.rowCount < 1) {
      if (password === confirm) {
        // Agregando esto a la base de datos
        const date = new Date()

        // Inicia transaccion
        await pool.query(`
          BEGIN;
          SAVEPOINT before_insert;
        `, [])

        finsert = await pool.query(`
          INSERT INTO swapuser VALUES ($1, $2, $3, 0, false);
        `, [username, password, name])

        await pool.query(`
          INSERT INTO freeuser VALUES ($1, true, 3, $2);
        `, [username, date])

        // Indicando que el insert fue todo un exito
        await pool.query('COMMIT;', [])
        response.created = 'DONE'
      } else {
        response.created = 'ERROR 105'
        throw 'Contrasenas no coinciden'
      }
    } else {
      throw 'Usuario existente'
    }
  } catch (error) {
    console.error(error.messasge)
    if (finsert) {
      await pool.query(`
        ROLLBACK TO before_insert;
        COMMIT; 
      `)
      response.created = 'ERROR 106'
    }
  } finally {
    res.json(response)
  }
})

module.exports = router
