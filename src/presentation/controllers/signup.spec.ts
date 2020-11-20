import { SignupController } from './signup'

describe('Signup Controller', () => {
  let httpRequest = {
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
    expect(httpResponse.body).toEqual(new Error('Missing param: name'))
  })

  test('should return 400 if no email is provided', () => {
    const sut = new SignupController()
    httpRequest.body.email = null

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('Missing param: email'))
  })
})
