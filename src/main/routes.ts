import { Express, Router } from 'express'
import signup from './routes/signup-route'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  signup(router)
}
