const express = require('express')
const pool = require('../database')

const router = express.Router()

router.post('/weeklyalbum', async (req, res) => {
    try{
        const albums = await pool.query("SELECT albumname, release FROM album WHERE release > date_trunc('day', NOW() - interval '1 week')")
        console.log(albums.rows)
        res.json(albums.rows)
    }catch(error){
        console.error(error.message)
    }
})

router.post('/artistsrise', async (req, res) => {
    try{
        const artists = await pool.query('SELECT artistname FROM artist WHERE playbackthreemonths > playbacksixmonths')
        res.json(artists.rows)
    }catch(error){
        console.error(error.message)
    }
})

router.post('/subsrise', async (req, res) => {
    try{
        const subscriptions = await pool.query("SELECT COUNT(*) FROM premiumuser WHERE subscription > date_trunc('day', NOW() - interval '6 month')")
        res.json(subscriptions.rows)
    }catch(error){
        console.error(error.message)
    }
})

router.post('/production', async (req, res) => {
    try{
        const musiccount = await pool.query('SELECT author, count(*) FROM song GROUP BY author ORDER BY count DESC LIMIT 5')
        res.json(musiccount.rows)
    }catch(error){
        console.error(error.message)
    }
})

router.post('/populargenre', async (req, res) => {
    try{
        const popgenre = await pool.query('SELECT songgenre, SUM(timesplayed) AS reproducciones FROM genre INNER JOIN song ON song.songid = genre.songid GROUP BY songgenre ORDER BY reproducciones DESC LIMIT 3')
        res.json(popgenre.rows)
    }catch(error){
        console.error(error.message)
    }
})

router.post('/activeuser', async (req, res) => {
    try{
        const mostactive = await pool.query('SELECT username, playback FROM swapuser ORDER BY playback DESC LIMIT 5')
        res.json(mostactive.rows)
    }catch(error){
        console.error(error.message)
    }
})

module.exports = router
