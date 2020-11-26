import bcrypt from 'bcrypt'
import { Bcryptadapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const salt: number = 12
    const sut = new Bcryptadapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('password')

    expect(hashSpy).toHaveBeenCalledWith('password', salt)
  })
})
