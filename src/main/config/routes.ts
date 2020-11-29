import { Express, Router } from 'express'
import signupRouter from '../routes/signup-route'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  signupRouter(router)
}
