const express = require('express')
const pool = require('../database')

const router = express.Router()

/**
 * Se encarga de obtener todo el historial
 * devulve un array con los siguientes objetos
 * {
 *    username: 'ejemplo',
 *    datee: 'YYYY-MM-DD',
 *    timee: 'HH:MM:SS',
 *    affected: 'nombre tabla',
 *    operation: '(delete o insert o update)'
 * }
*/
router.get('/', async (req, res) => {
  let history = {}
  try {
    const aux = await pool.query(`
      SELECT *
      FROM binnacle;
    `)

    history = aux.rows
  } catch (error) {
    history = {}
  } finally {
    res.json(history)
  }
})

/**
 * Se encarga de obtener el historial de un cuate
 * se obtiene con el siguiente objeto
 * {
 *    username: 'ejemplo'
 * }
 * devulve un array con los siguientes objetos
 * {
 *    username: 'ejemplo',
 *    datee: 'YYYY-MM-DD',
 *    timee: 'HH:MM:SS',
 *    affected: 'nombre tabla',
 *    operation: '(delete o insert o update)'
 * }
*/
router.post('/username', async (req, res) => {
  let history = {}
  try {
    const { username } = req.body
    const aux = await pool.query(`
      SELECT *
      FROM binnacle
      WHERE username = $1;
    `, [username])

    history = aux.rows
  } catch (error) {
    history = { }
  } finally {
    res.json(history)
  }
})

/**
 * Se encarga de obtener el historial de un cuate
 * se obtiene con el siguiente objeto
 * {
 *    operation: '(delete o insert o update)'
 * }
 * devulve un array con los siguientes objetos
 * {
 *    username: 'ejemplo',
 *    datee: 'YYYY-MM-DD',
 *    timee: 'HH:MM:SS',
 *    affected: 'nombre tabla',
 *    operation: '(delete o insert o update)'
 * }
*/
router.post('/operation', async (req, res) => {
  let history = {}
  try {
    const { operation } = req.body
    const aux = await pool.query(`
      SELECT *
      FROM binnacle
      WHERE operation = $1;
    `, [operation])

    history = aux.rows
  } catch (error) {
    history = {}
  } finally {
    res.json(history)
  }
})

module.exports = router
