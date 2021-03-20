const { Pool } = require('pg')
const variable = require('./envVariables')

const pool = new Pool(variable)

module.exports = pool
