export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal server error')
    this.name = 'ServierError'
    this.stack = stack
  }
}
