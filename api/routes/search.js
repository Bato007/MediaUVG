var express = require('express');
var router = express.Router();
const pool = require('../database')

router.get('/song', async (req, res) => {
    try {
        const { song } = req.body
        const songs = await pool.query("SELECT * FROM song WHERE songname = $1", [song])
        res.json(songs.rows)
        res.json(songs.rows)
    } catch (error) {
    }
})

router.get('/album', async (req, res) => {
    try {
        const { album } = req.body
        const songs = await pool.query("SELECT * FROM song WHERE albumID IN (SELECT albumid FROM album WHERE albumname = $1)", [album])
        res.json(songs.rows)
    } catch (error) {
    }
})

router.get('/genre', async (req, res) => {
    try {
        const { genre } = req.body
        const songs = await pool.query("SELECT * FROM song WHERE songId IN (SELECT songId FROM genre WHERE songgenre = $1) AND active = true", [genre])
        res.json(songs.rows)
    } catch (error) {
    }
})

router.get('/artist', async (req, res) => {
    try {
        const { author } = req.body
        const songs = await pool.query("SELECT * FROM song WHERE author IN (SELECT artistname FROM artist WHERE artistname = $1)", [author])
        res.json(songs.rows)
    } catch (error) {
    }
})

module.exports = router