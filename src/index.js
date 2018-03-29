'use strict'

import BankAccount from './controllers/bankAccount'
import ECheck from './controllers/eCheck'
import CreditCard from './controllers/creditCard'

export default class Intuit {
  constructor (args) {
    this.version = args.version
    this.production = args.production
  }

  BankAccount (accessToken) {
    return new BankAccount({
      version: this.version,
      production: this.production,
      accessToken: accessToken
    })
  }

  ECheck (accessToken) {
    return new ECheck({
      version: this.version,
      production: this.production,
      accessToken: accessToken
    })
  }

  CreditCard (accessToken) {
    return new CreditCard({
      version: this.version,
      production: this.production,
      accessToken: accessToken
    })
  }
}
