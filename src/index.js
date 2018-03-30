'use strict'

import BankAccount from './controllers/bankAccount'
import CreditCard from './controllers/creditCard'
import Token from './controllers/token'

export default class Intuit {
  constructor (args) {
    this.version = args.version
    this.production = args.production
  }

  BankAccount (accessToken, realmID) {
    return new BankAccount({
      version: this.version,
      production: this.production,
      accessToken: accessToken,
      realmID: realmID
    })
  }

  CreditCard (accessToken, realmID) {
    return new CreditCard({
      version: this.version,
      production: this.production,
      accessToken: accessToken,
      realmID: realmID
    })
  }

  Token (accessToken, realmID) {
    return new Token({
      version: this.version,
      production: this.production,
      accessToken: accessToken,
      realmID: realmID
    })
  }
}
