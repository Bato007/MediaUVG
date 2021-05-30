const express = require('express')
const cors = require('cors')
const searchRouter = require('./routes/search')
const logInRouter = require('./routes/login')
const playlistRouter = require('./routes/playlistManager')
const accountRouter = require('./routes/accountStatus')
const adminRouter = require('./routes/admin')
const statsRouter = require('./routes/stats')
const addRouter = require('./routes/addTable')
const editRouter = require('./routes/editData')
const binnacleRouter = require('./routes/binnacle')
const monitorsRouter = require('./routes/monitors')
const simulationRouter = require('./routes/simulation')
const noRelationalRouter = require('./routes/noRelational')

const pool = require('./database')

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

// Middleware para crear siempre la tabla
app.use(async (req, res, next) => {
  const { modifier } = req.body
  try {
    await pool.query(`
      BEGIN;
    `)

    await pool.query(`
      CREATE TEMP TABLE IF NOT EXISTS user_history (
        username VARCHAR(30)
      ); 
    `)

    await pool.query(`
      DELETE FROM user_history;
    `)

    await pool.query(`
      INSERT INTO user_history VALUES 
        ($1);
    `, [modifier])

    await pool.query('COMMIT;')
    next()
  } catch (error) {
    await pool.query('ROLLBACK;')
    console.log(error.message)
    res.json({ status: 'ERROR' })
  }
})

app.use('/search', searchRouter)
app.use('/login', logInRouter)
app.use('/playlist', playlistRouter)
app.use('/account', accountRouter)
app.use('/admin', adminRouter)
app.use('/stats', statsRouter)
app.use('/add', addRouter)
app.use('/edit', editRouter)
app.use('/binnacle', binnacleRouter)
app.use('/monitors', monitorsRouter)
app.use('/simulation', simulationRouter)
app.use('/mongo', noRelationalRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
