'use strict'

export default class NotImplementedError extends Error {
  constructor (message = 'This method is abstract and has not been overriden yet. Check the stack trace') {
    super(message)

    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
    this.status = 500
  }
}
