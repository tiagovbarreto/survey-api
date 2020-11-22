import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Controller } from '../interfaces/controller'
import { HttpRequest, HttpResponse } from '../interfaces/http'

export class SignupController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const fields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
