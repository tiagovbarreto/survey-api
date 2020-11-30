import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('Log Controller  Decorator', () => {
  test('should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const httpResponse: HttpResponse = {
          statusCode: 200,
          body: {}
        }
        return httpResponse
      }
    }

    const controllerStub = new ControllerStub()

    const sut = new LogControllerDecorator(controllerStub)

    const httpRequest: HttpRequest = {
      body: {
        name: 'some-name',
        email: 'some-email@mail.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }

    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
