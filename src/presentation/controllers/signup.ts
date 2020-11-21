import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { HttpRequest, HttpResponse } from '../ports/http'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const fields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
