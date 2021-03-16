const express = require('express')
const app = express()
const port = 3000
const pool = require('./database')

app.use(express.json())

app.post('/', async(req, res) => {
  try{
    console.log(req.body)
  }catch (err) {
    console.error(err.message)
  }
})

const { Pool, Client } = require('pg')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})