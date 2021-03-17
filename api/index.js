const express = require('express')
const app = express()
const port = 3001
const pool = require('./database')
const cors = require('cors')
const searchRouter = require('./routes/search')

app.use(express.json())
app.use(cors())

app.use('/search', searchRouter)

app.get('/', async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM swapuser")
    res.json(users.rows)
  } catch (error) {
    console.error(error.messasge)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})