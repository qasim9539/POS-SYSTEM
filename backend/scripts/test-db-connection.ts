import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const uri = process.env.MONGODB_URI

if (!uri) {
  console.error('MONGODB_URI is not set in backend/.env')
  process.exit(1)
}

const masked = uri.replace(/:([^@/]+)@/, ':***@')

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  console.log('MongoDB connection successful')
  console.log(masked)
  await mongoose.disconnect()
  process.exit(0)
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error('MongoDB connection failed')
  console.error(masked)
  console.error(message)

  if (message.includes('bad auth') || message.includes('Authentication failed')) {
    console.error('\nReset the database user password in MongoDB Atlas:')
    console.error('Database Access -> Edit user -> Edit Password -> Update .env')
  }

  process.exit(1)
}
