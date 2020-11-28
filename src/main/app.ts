import express from 'express'
import middlewares from './middlewares/middlewares'

const app = express()
middlewares(app)

export default app
