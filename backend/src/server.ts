import { createApp } from './app.js'
import { connectDatabase } from './config/database.js'
import { env } from './config/env.js'

async function bootstrap() {
  try {
    await connectDatabase()
    console.log('Connected to MongoDB Atlas')

    const app = createApp()

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT} [${env.NODE_ENV}]`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

bootstrap()
