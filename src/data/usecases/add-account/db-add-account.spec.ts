import { ServerError } from '../../../presentation/errors'
import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Encrypter
} from './db-add-account-protocols'
import { DBAddAccount } from './db-add-account'

interface SutTypes {
  sut: DBAddAccount;
  encrypterStub: Encrypter;
  addAccountRepositoryStub: AddAccountRepository;
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (password: string): Promise<string> {
      return 'hashed-password'
    }
  }

  return new EncrypterStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid-id',
        name: 'valid-name',
        email: 'valid-email@mail.com',
        password: 'hashed-password'
      }
      return fakeAccount
    }
  }

  return new AddAccountRepositoryStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DBAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
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

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid-name',
      email: 'valid-email@mail.com',
      password: 'hashed-password'
    })
  })

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()

    jest.spyOn(addAccountRepositoryStub, 'add').mockImplementationOnce(() => {
      return Promise.reject(new ServerError())
    })

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })

  test('should return an account if success', async () => {
    const { sut } = makeSut()

    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: 'valid-id',
      name: 'valid-name',
      email: 'valid-email@mail.com',
      password: 'hashed-password'
    })
  })
})
