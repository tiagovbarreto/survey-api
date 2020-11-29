import { Encrypter } from '../../data/protocols/encrypter'
import { DBAddAccount } from '../../data/usecases/add-account/db-add-account'
import { AddAccount } from '../../domain/usecases/add-account'
import { Bcryptadapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/database/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidator } from '../../presentation/protocols/email-validator'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'

export const makeSignUpController = () => {
  const emailValidator: EmailValidator = new EmailValidatorAdapter()

  const salt = 12
  const encrypter: Encrypter = new Bcryptadapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const addAccount: AddAccount = new DBAddAccount(
    encrypter,
    addAccountRepository
  )

  return new SignUpController(emailValidator, addAccount)
}
