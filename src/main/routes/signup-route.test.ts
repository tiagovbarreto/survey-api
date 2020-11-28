import request from 'supertest'

import app from '../app'

describe('signup route', () => {
  test('should return an account on success', async () => {
    const res = await request(app).post('/api/signup').send({
      name: 'Tiago',
      email: 'tiago@mail.com',
      password: '123',
      passwordConfirmation: '123'
    })
    expect(res.status).toBe(201)
  })
})
