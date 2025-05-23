import dotenv from 'dotenv'

dotenv.config()

import pg from 'pg'

const db = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

export default db