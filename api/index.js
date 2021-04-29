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

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.use('/search', searchRouter)
app.use('/login', logInRouter)
app.use('/playlist', playlistRouter)
app.use('/account', accountRouter)
app.use('/admin', adminRouter)
app.use('/stats', statsRouter)
app.use('/add', addRouter)
app.use('/edit', editRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
