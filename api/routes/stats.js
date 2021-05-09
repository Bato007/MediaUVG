const express = require('express')
const pool = require('../database')

const router = express.Router()

router.post('/weeklyalbum', async (req, res) => {
  try {
    const albums = await pool.query("SELECT albumname, author FROM album WHERE release < date_trunc('day', NOW() - interval '1 week')")
    res.json(albums.rows)
  } catch (error) {
    console.error(error.message)
  }
})

router.post('/artistsrise', async (req, res) => {
  try {
    const artists = await pool.query('SELECT artistname, (playbackthreemonths - playbacksixmonths) AS rise FROM artist WHERE playbackthreemonths > playbacksixmonths ORDER BY rise DESC LIMIT 5')
    res.json(artists.rows)
  } catch (error) {
    console.error(error.message)
  }
})

router.post('/subsrise', async (req, res) => {
  try {
    const subscriptions = await pool.query("SELECT COUNT(*), EXTRACT(MONTH from subscription) as month, EXTRACT(YEAR from subscription) as year FROM premiumuser WHERE subscription > date_trunc('day', NOW() - interval '6 month') GROUP BY subscription ORDER BY year ASC, month ASC")
    res.json(subscriptions.rows)
  } catch (error) {
    console.error(error.message)
  }
})

router.post('/production', async (req, res) => {
  try {
    const musiccount = await pool.query('SELECT author, count(*) FROM song GROUP BY author ORDER BY count DESC LIMIT 5')
    res.json(musiccount.rows)
  } catch (error) {
    console.error(error.message)
  }
})

router.post('/populargenre', async (req, res) => {
  try {
    const popgenre = await pool.query('SELECT songgenre, SUM(timesplayed) AS reproducciones FROM genre INNER JOIN song ON song.songid = genre.songid GROUP BY songgenre ORDER BY reproducciones DESC LIMIT 3')
    res.json(popgenre.rows)
  } catch (error) {
    console.error(error.message)
  }
})

router.post('/activeuser', async (req, res) => {
  try {
    const mostactive = await pool.query('SELECT username, playback FROM swapuser ORDER BY playback DESC LIMIT 5')
    res.json(mostactive.rows)
  } catch (error) {
    console.error(error.message)
  }
})

router.get('/payment', async (req, res) => {
  let reports = []
  try {
    await pool.query(`
      BEGIN;
    `)
    await pool.query(`
      SELECT * FROM create_reports();`)
    const report = await pool.query(`
      SELECT * FROM reports;`)
    await pool.query(`
      COMMIT;
    `)

    reports = report.rows
  } catch (error) {
    reports = []
    await pool.query(`
      ROLLBACK;
    `)
  } finally {
    res.json(reports)
  }
})

router.post('/sales_week', async (req, res) => {
  let sales = []
  try {
    const { firstDate, lastDate } = req.body
    const temp = await pool.query(`
      SELECT * 
      FROM get_sales_week($1, $2);
    `, [firstDate, lastDate])

    sales = temp.rows
  } catch (error) {
    sales = []
  } finally {
    res.json(sales)
  }
})

module.exports = router
