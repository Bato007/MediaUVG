const variable = require('./envVariables')

const { Pool, Client } = require('pg')

const pool = new Pool(variable)

module.exports = pool