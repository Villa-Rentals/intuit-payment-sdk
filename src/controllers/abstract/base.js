'use strict'

import axios from 'axios'
import { v1 as uuidv1 } from 'uuid'
import NotImplementedError from '../../errors/notImplementedError'

export default class Base {
  constructor (args) {
    this.accessToken = args.accessToken
    this.realmID = args.realmID
    this.production = args.production
    this.version = args.version
  }

  formatUrl (path) {
    let domain = 'sandbox.api.intuit.com'
    if (this.production) {
      domain = 'api.intuit.com'
    }
    return `https://${domain}/quickbooks/${this.version}${path}`
  }

  request (method, path, params = {}) {
    let headers = {
      'Authorization': `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json',
      'Company-Id': this.realmID,
      'Request-Id': uuidv1()
    }
    return axios({
      method: method,
      url: this.formatUrl(path),
      data: params,
      headers: headers
    })
  }

  create (info) {
    throw new NotImplementedError()
  }

  createFromToken (info) {
    throw new NotImplementedError()
  }

  get (id) {
    throw new NotImplementedError()
  }

  all () {
    throw new NotImplementedError()
  }

  remove (id) {
    throw new NotImplementedError()
  }

  update (id, info) {
    throw new NotImplementedError()
  }
}
