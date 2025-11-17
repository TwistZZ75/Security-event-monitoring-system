const Pool = require('pg').Pool
require('dotenv').config()

const { 
    DB_USERNAME, 
    DB_PASSWORD, 
    DB_HOST, 
    DB_PORT, 
    DB_NAME 
} = process.env

const pool = new Pool({
    user: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME
})

module.exports = pool