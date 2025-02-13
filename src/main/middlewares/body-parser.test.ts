import request from 'supertest'

import app from '../app'

describe('Body parser middleware', () => {
  test('should parse body as json', async () => {
    app.post('/test-body-parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test-body-parser')
      .send({ name: 'Tiago' })
      .expect({ name: 'Tiago' })
  })
})
