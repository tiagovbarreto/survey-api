import { AddAccountModel } from '../../../domain/usecases/add-account'
import { ServerError } from '../../../presentation/errors'
import { Encrypter } from '../../protocols/encrypter'
import { DBAddAccount } from './db-add-account'

interface SutTypes {
  sut: DBAddAccount;
  encrypterStub: Encrypter;
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return 'hashed-password'
    }
  }

  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DBAddAccount(encrypterStub)
  return {
    sut,
    encrypterStub
  }
}

describe('DBAddAccount UseCase', () => {
  let accountData: AddAccountModel

  beforeEach(() => {
    accountData = {
      name: 'valid-name',
      email: 'valid-email@mail.com',
      password: 'password'
    }
  })

  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('password')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()

    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      return Promise.reject(new ServerError())
    })

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
