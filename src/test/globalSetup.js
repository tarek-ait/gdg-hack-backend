import { MongoMemoryServer } from 'mongodb-memory-server'

export default async function globalSetup() {
  const instance = new MongoMemoryServer.create({
    binary: {
      version: '6.0.4', // for the docker containerF
    }
  })
  global.__MONGOINSTANCE = instance
  process.env.DATABASE_URL = instance.getUri()
}
