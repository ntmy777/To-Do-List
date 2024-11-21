// connect database
const Pool = require('pg').Pool

const pool = new Pool({
    // setup configuration
    user: "postgres",
    password: " ",
    host: "localhost",
    port: 5432,
    database:"todolist",
})

module.exports = pool;