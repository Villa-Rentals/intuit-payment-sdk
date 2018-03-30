'use strict'

import { assert } from 'chai'
import Intuit from '../../lib/intuitPaymentSDK.js'

describe('Given an instance of CreditCard', () => {
  let lib
  let cardID

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
        if (!cardID) {
          assert.equal(error.response.status, 404)
        } else {
          assert.isNull(error, 'Error should be null')
        }
      })
  })

  it('get all credit cards', () => {
    return lib.all('customerID')
      .then(({data}) => {
        if (!cardID) {
          assert.isTrue(true)
        } else {
          assert.isArray(data, 'Response is array')
          assert.equal(data[0].id, cardID)
        }
      })
      .catch((error) => {
        if (!cardID) {
          assert.equal(error.response.status, 404)
        } else {
          assert.isNull(error, 'Error should be null')
        }
      })
  })

  it('delete a credit card', () => {
    return lib.remove(cardID, 'customerID')
      .then(() => {
        assert.isTrue(true)
      })
      .catch((error) => {
        if (!cardID) {
          assert.equal(error.response.status, 404)
        } else {
          assert.isNull(error, 'Error should be null')
        }
      })
  })
})
