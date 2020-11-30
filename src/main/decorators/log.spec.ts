import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
}

const makeController = () => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {}
      }
      return httpResponse
    }
  }

  return new ControllerStub()
}

const makeSut = (): SutTypes => {
  const controllerStub: Controller = makeController()
  const sut = new LogControllerDecorator(controllerStub)

  return {
    sut,
    controllerStub
  }
}

describe('Log Controller  Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()

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
