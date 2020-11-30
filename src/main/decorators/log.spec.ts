import { LogErrorRepository } from '../../data/protocols/log-error-repository'
import { serverError } from '../../presentation/helpers/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

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

const makeLogErrorRepository = () => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string) {
      return null
    }
  }

  return new LogErrorRepositoryStub()
}

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeSut = (): SutTypes => {
  const controllerStub: Controller = makeController()
  const logErrorRepositoryStub: LogErrorRepository = makeLogErrorRepository()
  const sut = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  )

  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}

let httpRequest: HttpRequest = {}

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

  test('should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const fakeError = new Error()
    fakeError.stack = 'any-stack'
    const error = serverError(fakeError)

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log')
    jest.spyOn(controllerStub, 'handle').mockImplementationOnce(() => {
      return Promise.resolve(error)
    })

    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any-stack')
  })
})
