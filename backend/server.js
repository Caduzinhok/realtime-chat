import runDbMigrations from './db/migrations/index.js'
import authRoutes from './routes/auth/auth.routes.js'
import {app, server} from './socket/socket.js'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT

app.use("/api/auth", authRoutes)

async function start() {
     
    await runDbMigrations()
    
    server.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`)
    })
}

start()