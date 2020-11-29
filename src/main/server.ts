import { MongoHelper } from '../infra/database/mongodb/account-repository/helpers/mongo-helper'
import app from './app'
import env from './config/env'

const start = async () => {
  if (!env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined')
  }

  try {
    await MongoHelper.connect(env.MONGO_URI)
    console.log('Mongodb connected.')
  } catch (error) {
    console.log(error)
  }

  app.listen(env.PORT, () =>
    console.log(`Server running on http://localhost:${env.PORT}`)
  )
}

start()
