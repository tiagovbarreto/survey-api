import { HttpRequest, HttpResponse } from '../ports/http'

export class SignupController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const fields = ['name', 'email', 'password', 'passwordConfirmation']

    for (const field of fields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${field}`)
        }
      }
    }
  }
}
