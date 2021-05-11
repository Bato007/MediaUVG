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
 * Obtiene todos las operaciones con el siguiente formato
 * [
 *  {
 *    id: 1,
 *    description: 'hola'
 *  },
 * ]
 */
router.get('/operations', async (req, res) => {
  let operations = []
  try {
    const temp = await pool.query(`
      SELECT *
      FROM operation;
    `)

    operations = temp.rows
  } catch (error) {
    operations = []
  } finally {
    res.json(operations)
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
      SELECT operationid, description 
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

/**
 * Se agrega un monitor, se debe de mandar lo siguiente:
 * {
 *  name: 'ejemplo',
 *  operations: [1, 2, 3, ..., 5]
 * }
 * Si hubo un error mandara el ERROR 901 con el siguiente
 * template:
 * {
 *  status: 'DONE'
 * }
 */
router.post('/add', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { name, operations } = req.body
    await pool.query(`
      BEGIN;
    `)

    await pool.query(`
      INSERT INTO monitor VALUES ($1);
    `, [name])

    await pool.query(`
      SELECT *
      FROM insert_all_operations($1, $2);
    `, [name, operations])

    await pool.query(`
      COMMIT;
    `)

    response.status = 'DONE'
  } catch (error) {
    response.status = 'ERROR 901'
    await pool.query(`
      ROLLBACK;
    `)
  } finally {
    res.json(response)
  }
})

/**
 * Se agrega un monitor, se debe de mandar lo siguiente:
 * {
 *  username: 'ejemplo',
 *  monitor: 'ejemplo',
 * }
 * Si hubo un error mandara el ERROR 902 con el siguiente
 * template:
 * {
 *  status: 'DONE'
 * }
 */
router.post('/assign', async (req, res) => {
  const response = {
    status: '',
  }
  try {
    const { monitor, username } = req.body
    await pool.query(`
      UPDATE swapuser SET 
      monitor = $1 
      WHERE username = $2;
    `, [monitor, username])

    response.status = 'DONE'
  } catch (error) {
    response.status = 'ERROR 902'
    await pool.query(`
      ROLLBACK;
    `)
  } finally {
    res.json(response)
  }
})

/**
 * Se agrega un monitor, se debe de mandar lo siguiente:
 * {
 *  username: 'ejemplo',
 * }
 * Si hubo un error mandara el ERROR 902 con el siguiente
 * template:
 * {
 *  monitors: [1, 2, 3, 4, ..., 8]
 * }
 */
router.post('/ismonitor', async (req, res) => {
  let monitors = []
  try {
    const { username } = req.body
    const temp = await pool.query(`
      SELECT P2.operationid, 
        (SELECT description FROM operation WHERE operation.id IN (P2.operationid))
      FROM ((SELECT username, monitor
        FROM swapuser
        WHERE username = $1) P1 NATURAL JOIN monitoroperation) P2
    `, [username])

    monitors = temp.rows
  } catch (error) {
    monitors = []
  } finally {
    res.json(monitors)
  }
})

module.exports = router
