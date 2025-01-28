import db from '../config.js'
import  createUserTable from './create-table.js'

const runDbMigrations = async () => {
    console.log(`Running migrations...`)

    const client = await db.connect()

    try {
        await client.query(createUserTable)

        await client.query('COMMIT')
        console.log("Migrations finished...")
    } catch(e) {
        await client.query('ROLLBACK')

        console.log(`Database migrations failed...`)
    }
}

export default runDbMigrations