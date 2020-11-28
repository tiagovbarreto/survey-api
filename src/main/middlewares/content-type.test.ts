import request from 'supertest'

import app from '../app'

describe('content-type middleware', () => {
  test('should return content-type as json', async () => {
    app.get('/test-content-type', (req, res) => {
      res.send()
    })
    await request(app).get('/test-content-type').expect('content-type', /json/)
  })
})
