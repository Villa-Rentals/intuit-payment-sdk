'use strict'

import axios from 'axios'
import NotImplementedError from '../../errors/notImplementedError'

export default class Base {
  constructor (args) {
    this.accessToken = args.accessToken
    this.production = args.production
    this.version = args.version
  }

  formatUrl (path) {
    let domain = 'sandbox.api.intuit.com'
    if (this.production) {
      domain = 'api.intuit.com'
    }
    return `https://${domain}${this.path}/quickbooks/${this.version}/${path}`
  }

  request (path, method, params) {
    axios({
      method: method,
      url: this.formatUrl(path),
      data: params,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    })
  }

  create (info) {
    throw new NotImplementedError()
  }

  get (id) {
    throw new NotImplementedError()
  }

  refund (id) {
    throw new NotImplementedError()
  }

  update (id, info) {
    throw new NotImplementedError()
  }
}
