'use strict'

import { assert } from 'chai'
import Intuit from '../../lib/intuitPaymentSDK.js'

describe('Given an instance of BankAccount', () => {
  let lib

  before(() => {
    lib = new Intuit({
      production: false,
      version: 'v4'
    }).BankAccount('some-token')
  })

  describe('creating a charge', () => {

  })
})
