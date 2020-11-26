import bcrypt from 'bcrypt'
import { Bcryptadapter } from './bcrypt-adapter'

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const salt: number = 12
    const sut = new Bcryptadapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('password')
    expect(hashSpy).toHaveBeenCalledWith('password', salt)
  })

  test('should return a hash if success', async () => {
    const salt: number = 12
    const sut = new Bcryptadapter(salt)
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      return Promise.resolve<string>('hashed-password')
    })
    const hash = await sut.encrypt('password')
    expect(hash).toBe('hashed-password')
  })
})
