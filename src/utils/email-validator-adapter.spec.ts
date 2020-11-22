import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

describe('EmailValidator Adapter', () => {
  test('should return false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValue(false)
    const isValid = sut.isValid('invalid-email@mail.com')
    expect(isValid).toBe(false)
  })

  test('should return true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValue(true)
    const isValid = sut.isValid('valid-email@mail.com')
    expect(isValid).toBe(true)
  })

  test('should call validator with corret email', () => {
    const sut = new EmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('some-email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('some-email@mail.com')
  })
})
