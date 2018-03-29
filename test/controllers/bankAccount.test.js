'use strict'

import { assert } from 'chai'
import Intuit from '../../lib/intuitPaymentSDK.js'

describe('Given an instance of BankAccount', () => {
  let lib

  before(() => {
    lib = new Intuit({
      production: false,
      version: 'v4'
    }).BankAccount(process.env.ACCESS_TOKEN, process.env.REALM_ID)
  })

  it('add a bank account', () => {
    return lib.create({
      name: 'My Checking',
      routingNumber: '322079353',
      accountNumber: '11000000333456781',
      accountType: 'PERSONAL_CHECKING',
      phone: '6047296480'
    }, 'customerID', 'requestID')
      .then(({data}) => {
        assert.equal(data.name, 'My Checking')
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })
})
