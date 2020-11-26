import bcrypt from 'bcrypt'
import { Bcryptadapter } from './bcrypt-adapter'

const salt: number = 12
const makeSut = (): Bcryptadapter => {
  return new Bcryptadapter(salt)
}

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('password')
    expect(hashSpy).toHaveBeenCalledWith('password', salt)
  })

  test('should return a hash if success', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      return Promise.resolve<string>('hashed-password')
    })
    const hash = await sut.encrypt('password')
    expect(hash).toBe('hashed-password')
  })

  test('should throw if bcrypt throws', async () => {
    const sut = makeSut()

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      return Promise.reject(new Error())
    })

    const promise = sut.encrypt('password')
    await expect(promise).rejects.toThrow()
  })
})
