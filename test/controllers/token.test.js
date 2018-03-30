'use strict'

import { assert } from 'chai'
import Intuit from '../../lib/intuitPaymentSDK.js'

describe('Given an instance of Token', () => {
  let lib

  before(() => {
    lib = new Intuit({
      production: false,
      version: 'v4'
    }).Token(process.env.ACCESS_TOKEN, process.env.REALM_ID)
  })

  it('create token from credit card', () => {
    return lib.create({
      card: {
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
      }
    })
      .then(() => {
        assert.isTrue(true)
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })

  it('create token from bank account', () => {
    return lib.create({
      bankaccount: {
        name: 'My Checking',
        routingNumber: '322079353',
        accountNumber: '11000000333456781',
        accountType: 'PERSONAL_CHECKING',
        phone: '6047296480'
      }
    })
      .then(() => {
        assert.isTrue(true)
      })
      .catch((error) => {
        assert.isNull(error, 'Error should be null')
      })
  })
})
