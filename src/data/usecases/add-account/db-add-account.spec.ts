import { Encrypter } from '../../protocols/encrypter'
import { DBAddAccount } from './db-add-account'

describe('DBAddAccount UseCase', () => {
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

  test('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    const accountData = {
      name: 'valid-name',
      email: 'valid-email@mail.com',
      password: 'password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('password')
  })
})
