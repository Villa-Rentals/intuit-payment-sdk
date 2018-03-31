'use strict'

import { assert } from 'chai'
import Intuit from '../../lib/intuitPaymentSDK.js'

describe('Given an instance of BankAccount', () => {
  let lib
  let bankID
  let checkID

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
    }, 'customerID')
      .then(({data}) => {
        bankID = data.id
        assert.equal(data.name, 'My Checking')
      })
      .catch((error) => {
        assert.equal(error.response.status, 409)
      })
  })

  it('get a bank account', () => {
    return lib.get(bankID, 'customerID')
      .then(({data}) => {
        assert.equal(data.id, bankID)
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('get all bank accounts', () => {
    return lib.all('customerID')
      .then(({data}) => {
        assert.isArray(data, 'Response is array')
        assert.equal(data[0].id, bankID)
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('charge a bank account', () => {
    return lib.chargeByID(bankID, 10.00, 'Test charge from the unit test')
      .then(({data}) => {
        checkID = data.id
        assert.equal(data.amount, '10.00')
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('get receipt for a charge with a bank account', () => {
    return lib.receipt(checkID)
      .then(({data}) => {
        assert.equal(data.amount, '10.00')
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('delete a bank account', () => {
    return lib.remove(bankID, 'customerID')
      .then(() => {
        assert.isTrue(true)
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })
})
