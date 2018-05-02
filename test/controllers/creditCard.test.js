'use strict'

import { assert } from 'chai'
import Intuit from '../../lib/intuit-quickbook-payment'
import '../../env'

describe('Given an instance of CreditCard', () => {
  let lib
  let cardID
  let chargeID
  let refundID

  before(() => {
    lib = new Intuit({
      production: false,
      version: 'v4'
    }).CreditCard(process.env.ACCESS_TOKEN, process.env.REALM_ID)
  })

  it('add a credit card', () => {
    return lib.create({
      'number': '6011111111111117',
      'expMonth': '12',
      'expYear': '2026',
      'name': 'Test User',
      'address': {
        'streetAddress': '1245 Hana Rd',
        'city': 'Richmond',
        'region': 'VA',
        'country': 'US',
        'postalCode': '44112'
      }
    }, 'customerID')
      .then(({data}) => {
        cardID = data.id
        assert.equal(data.name, 'Test User')
      })
      .catch((error) => {
        assert.equal(error.response.status, 409)
      })
  })

  it('get a credit card', () => {
    return lib.get(cardID, 'customerID')
      .then(({data}) => {
        assert.equal(data.id, cardID)
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('get all credit cards', () => {
    return lib.all('customerID')
      .then(({data}) => {
        assert.isArray(data, 'Response is array')
        assert.equal(data[0].id, cardID)
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('charge a credit card', () => {
    return lib.chargeByID(cardID, 10.55, 'Charge is from the unit test')
      .then(({data}) => {
        chargeID = data.id
        assert.equal(data.amount, '10.55')
      })
      .catch((error) => {
        console.log(error.response.data)
        assert.isNull(error, 'Error should be null')
      })
  })

  it('retrieve a credit card charge', () => {
    return lib.receipt(chargeID)
      .then(({data}) => {
        assert.equal(data.amount, '10.55')
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('capture a credit card', () => {
    return lib.capture(chargeID, 5.00)
      .then(({data}) => {
        assert.equal(data.amount, '5.00')
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('process a refund', () => {
    return lib.refund(chargeID, 5.00, 'Refund issued as part of the unit test')
      .then(({data}) => {
        refundID = data.id
        assert.equal(data.amount, '5.00')
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('get a refund for a charge', () => {
    return lib.getRefund(chargeID, refundID)
      .then(({data}) => {
        assert.equal(data.amount, '5.00')
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('delete a credit card', () => {
    return lib.remove(cardID, 'customerID')
      .then(() => {
        assert.isTrue(true)
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })
})
