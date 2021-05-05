const express = require('express')
const pool = require('../database')

const router = express.Router()

/**
 * Obtiene todos los monitores con el siguiente formato
 * [
 *  {
 *    name: 'ejemplo',
 *  },
 * ]
 */
router.get('/', async (req, res) => {
  let monitors = []
  try {
    const temp = await pool.query(`
      SELECT *
      FROM monitor
      WHERE name <> 'default';
    `)

    monitors = temp.rows
  } catch (error) {
    monitors = []
  } finally {
    res.json(monitors)
  }
})

/**
 * Obtiene todos los permisos que el monitor
 * puede utilizar. Mandar un objeto de la siguiente
 * manera:
 * {
 *  monitor: 'ejemplo',
 * }
 * Lo que devolvera sera lo siguiente:
 * [
 *  {
 *    description: 'puede hacer esto',
 *  }
 * ]
 */
router.post('/', async (req, res) => {
  let descriptions = []
  try {
    const { monitor } = req.body
    const temp = await pool.query(`
      SELECT description 
      FROM (SELECT *
            FROM monitoroperation
            WHERE monitor = $1) P 
        INNER JOIN operation 
        ON operationid = id;
    `, [monitor])

    descriptions = temp.rows
  } catch (error) {
    descriptions = []
  } finally {
    res.json(descriptions)
  }
})

module.exports = router
