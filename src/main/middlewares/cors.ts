import { RequestHandler } from 'express'

export const cors: RequestHandler = (request, response, next): void => {
  response.set('access-control-allow-origin', '*')
  response.set('access-control-allow-headers', '*')
  response.set('access-control-allow-methods', '*')
  next()
}
