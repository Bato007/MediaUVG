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
 *  active: false,
 * }
 * Se respondera con el siguiente formato:
 * {
 *  status: '',
 * }
 * Si hubo un error status regresara ERROR 301 de lo contrario
 * devolvera DONE.
 */
router.post('/album', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      albumid, albumname, author, release, active,
    } = req.body
    await pool.query(`
      UPDATE album SET 
      albumname = $1, 
      author = $2, 
      release = $3,
      active = $4
      WHERE albumid = $5;
    `, [albumname, author, release, active, albumid])

    response.status = 'DONE'
  } catch (error) {
    response.status = 'ERROR 301'
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
 *  active: false,
 *  genreList: [],
 * }
 * La lista de genreList funciona de la siguiente forma:
 *  - Si esta vacia la lista no se realizan modificaciones
 *  - Si la lista tiene algun contenido entonces remplaza todos
 *    los generos de la cancion
 *
 * Se respondera con el siguiente formato:
 * {
 *  status: '',
 * }
 * Si hubo un error status regresara ERROR 302 de lo contrario
 * devolvera DONE.
 */
router.post('/song', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const {
      songid, songname, songlink, author, albumname, active, genreList,
    } = req.body

    await pool.query(`
          BEGIN;
          SAVEPOINT before_update;
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
      active = $5  
      WHERE songid = $6
    `, [songname, songlink, author, albumname, active, songid])

    if (genreList.length > 1) {
      // Borrando todos los generos de esa cancion
      await pool.query(`
        DELETE FROM genre
        WHERE songid = $1
      `, [songid])

      // Agregando todos los generos de esa cancion
      await pool.query(`
        INSERT INTO genre VALUES
          SELECT * FROM UNNEST ($1::int, $2::text[]);
      `, [songid, genreList])
    }

    await pool.query(`
          COMMIT;
        `, [])
  } catch (error) {
    response.status = 'ERROR 302'
    await pool.query(`
          ROLLBACK TO before_update;
          COMMIT;
        `, [])
  } finally {
    res.json(response)
  }
})

module.exports = router
