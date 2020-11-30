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

let httpRequest = {}

beforeEach(() => {
  httpRequest = {
    body: {
      name: 'some-name',
      email: 'some-email@mail.com',
      password: 'password',
      passwordConfirmation: 'password'
    }
  }
})

describe('Log Controller  Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('should call controller handle', async () => {
    const { sut } = makeSut()
    const res = await sut.handle(httpRequest)
    expect(res).toEqual({
      statusCode: 200,
      body: {}
    })
  })
})
