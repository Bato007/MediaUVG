const express = require('express')
const pool = require('../database')

const router = express.Router()

/**
 * Se encarga de realizarle el update al album en su totalidad
 * se necesita un objeto con la siguiente estructura:
 * {
 *  albumid: 0,
 *  albumname: 'hola',
 *  author: 'ejemplo',
 *  release: '24-02-2000',
 * }
 * Se respondera con el siguiente formato:
 * {
 *  status: '',
 * }
 * Si hubo un error status regresara ERROR 201 de lo contrario
 * devolvera DONE.
 */
router.post('/album', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      albumid, albumname, author, release,
    } = req.body
    console.log(req.body)
    await pool.query(`
      BEGIN;  
    `)

    await pool.query(`
      UPDATE album SET 
      albumname = $1, 
      author = $2, 
      release = $3
      WHERE albumid = $4;
    `, [albumname, author, release, albumid])

    response.status = 'DONE'
  } catch (error) {
    response.status = 'ERROR 201'
  } finally {
    res.json(response)
  }
})

/**
 * Se encarga de desactivar o activar el album
 * se necesita un objeto con la siguiente estructura:
 * {
 *  albumid: 0,
 *  active: false,
 * }
 * Se respondera con el siguiente formato:
 * {
 *  status: '',
 * }
 * Si hubo un error status regresara ERROR 205 de lo contrario
 * devolvera DONE.
 */
router.post('/album/visibility', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { albumid, active } = req.body

    await pool.query(`
      BEGIN;  
    `)

    await pool.query(`
      UPDATE album SET 
      active = $1
      WHERE albumid = $2;
    `, [active, albumid])

    await pool.query(`
      UPDATE song SET
      active = $1
      WHERE albumid = $2;
    `, [active, albumid])

    await pool.query(`
      COMMIT;
    `)

    response.status = 'DONE'
  } catch (error) {
    response.status = 'ERROR 205'
  } finally {
    res.json(response)
  }
})

/**
 * Se encarga de desactivar o activar la cancion
 * se necesita un objeto con la siguiente estructura:
 * {
 *  songid: 0,
 *  active: false,
 * }
 * Se respondera con el siguiente formato:
 * {
 *  status: '',
 * }
 * Si hubo un error status regresara ERROR 205 de lo contrario
 * devolvera DONE.
 */
router.post('/song/visibility', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { songid, active } = req.body

    await pool.query(`
      UPDATE song SET
      active = $1
      WHERE songid = $2;
    `, [active, songid])

    response.status = 'DONE'
  } catch (error) {
    response.status = 'ERROR 205'
  } finally {
    res.json(response)
  }
})

/**
 * Se encarga de realizarle el update al song en su totalidad
 * se necesita un objeto con la siguiente estructura:
 * {
 *  songid: -1,
 *  songname: 'hola',
 *  songlink: 'hola',
 *  author: 'ejemplo',
 *  albumname: 'ejemplo',
 *  genreList: [],
 * }
 * La lista de genreList funciona de la siguiente forma:
 *  - Si esta vacia la lista no se realizan modificaciones
 *  - Si la lista tiene algun contenido entonces remplaza todos
 *    los generos de la cancion
 *
 * Se respondera con el siguiente formato:
 * {
 *  status: 'DONE',
 * }
 * Si hubo un error status regresara ERROR 202 de lo contrario
 * devolvera DONE.
 */
router.post('/song', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      songid, songname, songlink, author, albumname, genreList,
    } = req.body

    await pool.query(`
          BEGIN;
        `, [])
    await pool.query(`
      UPDATE song SET 
      songname = $1,
      songlink = $2, 
      albumid = (SELECT albumid 
        FROM album 
        WHERE author = $3 
        AND albumname = $4), 
      author = $3, 
      WHERE songid = $6;
    `, [songname, songlink, author, albumname, songid])

    if (genreList.length > 1) {
      // Borrando todos los generos de esa cancion
      await pool.query(`
        DELETE FROM genre
        WHERE songid = $1
      `, [songid])

      // Agregando todos los generos de esa cancion
      await pool.query(`
        SELECT * FROM insert_all_genres ($1, $2);
      `, [songid, genreList])
    }

    await pool.query(`
          COMMIT;
        `, [])
    response.status = 'DONE'
  } catch (error) {
    response.status = 'ERROR 202'
    await pool.query(`
          ROLLBACK;
        `, [])
  } finally {
    res.json(response)
  }
})

/**
 * Se encarga de realizarle el update al song en su totalidad
 * se necesita un objeto con la siguiente estructura:
 * {
 *  artist: 'ejemplo',
 *  active: false,
 * }
 * La lista de genreList funciona de la siguiente forma:
 *  - Si esta vacia la lista no se realizan modificaciones
 *  - Si la lista tiene algun contenido entonces remplaza todos
 *    los generos de la cancion
 *
 * Se respondera con el siguiente formato:
 * {
 *  status: 'DONE',
 * }
 * Si hubo un error status regresara ERROR 206 de lo contrario
 * devolvera DONE.
 */
router.post('/artist/visibility', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      artist, active,
    } = req.body

    await pool.query(`
      BEGIN;
    `)

    await pool.query(`
      UPDATE artist SET 
      active = $1
      WHERE artistname = $2;
    `, [active, artist])

    await pool.query(`
      UPDATE album SET
      active = $1
      WHERE author = $2;
    `, [active, artist])

    await pool.query(`
      UPDATE song SET
      active = $1
      WHERE author = $2;
    `, [active, artist])

    await pool.query(`
      COMMIT;
    `)
    response.status = 'DONE'
  } catch (error) {
    response.status = 'ERROR 202'
    await pool.query(`
      ROLLBACK;
    `)
  } finally {
    res.json(response)
  }
})

/**
 * Se encarga de desactivar una cuenta free para que ya no
 * pueda acceder a la cuenta
 * {
 *  username: 'ejemplo',
 *  active: false,
 * }
 *
 * Se respondera con el siguiente formato:
 * {
 *  status: 'DONE',
 * }
 * Si hubo un error status regresara ERROR 203 de lo contrario
 * devolvera DONE.
 */
router.post('/free', async (req, res) => {
  const response = {
    status: '',
  }

  try {
    const { active, username } = req.body

    const user = await pool.query(`
      SELECT * 
      FROM freeuser
      WHERE username = $1
    `, [username])

    if (user.rowCount < 1) {
      throw 'No existe'
    }

    await pool.query(`
      UPDATE freeuser SET
        active = $1
      WHERE username = $2;
    `, [active, username])

    response.status = 'DONE'
  } catch (error) {
    response.status = 'ERROR 203'
  } finally {
    res.json(response)
  }
})

/**
 * Se encarga de eliminar la suscripcion de un usuario
 * premium
 * {
 *  username: 'ejemplo',
 * }
 *
 * Se respondera con el siguiente formato:
 * {
 *  status: 'DONE',
 * }
 * Si hubo un error status regresara ERROR 204 de lo contrario
 * devolvera DONE.
 */
router.post('/unpremium', async (req, res) => {
  const response = {
    status: '',
  }

  try {
    const { username } = req.body

    await pool.query(`
      BEGIN;
    `)

    await pool.query(`
      DELETE FROM premiumuser
      WHERE username = $1;
    `, [username])

    await pool.query(`
      INSERT INTO freeuser VALUES
        ($1, true, 3, $2)
    `, [username, new Date()])

    await pool.query(`
      COMMIT;
    `)

    response.status = 'DONE'
  } catch (error) {
    response.status = 'ERROR 204'
    pool.query(`
      ROLLBACK;
    `)
  } finally {
    res.json(response)
  }
})

module.exports = router
