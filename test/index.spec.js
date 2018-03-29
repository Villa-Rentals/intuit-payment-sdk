'use strict'

import chai from 'chai'

import Intuit from '../lib/intuitPaymentSDK.js'

chai.expect()

const expect = chai.expect

describe('Given an instance of Library', () => {
  let lib

  before(() => {
    lib = new Intuit({
      baseURL: 'sandbox.api.intuit.com'
    })
  })
})
