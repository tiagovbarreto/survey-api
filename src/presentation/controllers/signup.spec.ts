import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest } from '../ports/http'
import { SignupController } from './signup'

describe('Signup Controller', () => {
  let httpRequest: HttpRequest = {
    body: {
      name: 'some-name',
      email: 'some-email',
      password: 'some-password',
      passwordConfirmation: 'password'
    }
  }

  beforeEach(() => {
    httpRequest = {
      body: {
        name: 'some-name',
        email: 'some-email',
        password: 'some-password',
        passwordConfirmation: 'password'
      }
    }
  })

  test('should return 400 if no name is provided', () => {
    const sut = new SignupController()
    httpRequest.body.name = null

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if no email is provided', () => {
    const sut = new SignupController()
    httpRequest.body.email = null

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no senha is provided', () => {
    const sut = new SignupController()
    httpRequest.body.password = null

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })
})
