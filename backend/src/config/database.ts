import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDatabase(): Promise<void> {
  mongoose.set('strictQuery', true)

  try {
    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    if (message.includes('bad auth') || message.includes('Authentication failed')) {
      console.error('\nMongoDB authentication failed.')
      console.error('Your username or password in backend/.env is incorrect.')
      console.error('Fix in Atlas: Database Access -> your user -> Edit -> Reset Password')
      console.error('Then update MONGODB_URI in backend/.env with the new password.\n')
    } else if (message.includes('IP') || message.includes('whitelist')) {
      console.error('\nMongoDB network access blocked.')
      console.error('Fix in Atlas: Network Access -> Add IP Address -> Allow from anywhere (0.0.0.0/0)\n')
    }

    throw error
  }

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error)
  })
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect()
}
