import request from 'supertest'
import { MongoHelper } from '../../infra/database/mongodb/account-repository/helpers/mongo-helper'

import app from '../app'

describe('signup route', () => {
  beforeAll(async () => {
    const treta = await MongoHelper.connect(process.env.MONGO_URL)
    console.log(treta)
  })

  beforeEach(async () => {
    const collection = MongoHelper.getCollection('accounts')
    await collection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

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
