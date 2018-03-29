'use strict'

import { assert } from 'chai'
import Intuit from '../lib/intuitPaymentSDK.js'
import '../env'

describe('Given an instance of Library', () => {
  let lib

  before(() => {
    lib = new Intuit({
      production: false,
      version: 'v4'
    })
  })

  it('constructor works', () => {
    assert.equal(lib.production, false)
    assert.equal(lib.version, 'v4')
  })

  it('returns the BankAccount object', () => {
    let bank = lib.BankAccount('some token', 'some realmID')

    assert.equal(bank.production, false)
    assert.equal(bank.version, 'v4')
    assert.equal(bank.accessToken, 'some token')
    assert.equal(bank.realmID, 'some realmID')
  })

  it('returns the CreditCard object', () => {
    let card = lib.CreditCard('some token', 'some realmID')

    assert.equal(card.production, false)
    assert.equal(card.version, 'v4')
    assert.equal(card.accessToken, 'some token')
    assert.equal(card.realmID, 'some realmID')
  })
})
