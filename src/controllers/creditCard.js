'use strict'

import Base from './abstract/base'

export default class CreditCard extends Base {
  /**
   * `CreditCard` `create` method.
   *
   * Create a credit card object through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `card`
   *     - `number`           number on the card
   *     - `expMonth`         expiration month on the card
   *     - `expYear`          expiration year on the card
   *     - `name`             name on the card
   *     - `address`
   *       - `streetAddress`  street address of billing address
   *       - `city`           city of billing address
   *       - `region`         region of billing address
   *       - `country`        country of billing address
   *       - `postalCode`     postalCode of billing address
   *   - `customerID`       identifier for the customer
   *
   * Examples:
   *
   *     CreditCard().create({
   *       "number": "4408041234567893",
   *       "expMonth": "12",
   *       "expYear": "2026",
   *       "name": "Test User",
   *       "address": {
   *         "streetAddress": "1245 Hana Rd",
   *         "city": "Richmond",
   *         "region": "VA",
   *         "country": "US",
   *         "postalCode": "44112"
   *       }
   *     }, 'customer-id');
   *
   * @method
   * @param {object} card
   * @param {string} customerID
   * @access public
   * @return {Promise} promise containing network response object
   */
  create (card, customerID) {
    return this.request('POST', `/customers/${customerID}/cards`, card)
  }

  /**
   * `CreditCard` `createFromToken` method.
   *
   * Create a credit card object through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `token`            tokenized version of the card
   *   - `customerID`       identifier for the customer
   *
   * Examples:
   *
   *     CreditCard().createFromToken('some-token', 'customer-id');
   *
   * @method
   * @param {object} token
   * @param {string} customerID
   * @access public
   * @return {Promise} promise containing network response object
   */
  createFromToken (token, customerID) {
    return this.request('POST', `/customers/${customerID}/cards/createFromToken`, {
      value: token
    })
  }

  /**
   * `CreditCard` `remove` method.
   *
   * Remove a credit card through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `cardID`           identifier of the card
   *   - `customerID`       identifier for the customer
   *
   * Examples:
   *
   *     CreditCard().remove('identifier', 'customer-id');
   *
   * @method
   * @param {object} cardID
   * @param {string} customerID
   * @access public
   * @return {Promise} promise containing network response object
   */
  remove (cardID, customerID) {
    return this.request('DELETE', `/customers/${customerID}/cards/${cardID}`, {})
  }

  /**
   * `CreditCard` `get` method.
   *
   * Retrieve a credit card through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `cardID`           identifier of the card
   *   - `customerID`       identifier for the customer
   *
   * Examples:
   *
   *     CreditCard().get('identifier', 'customer-id');
   *
   * @method
   * @param {object} cardID
   * @param {string} customerID
   * @access public
   * @return {Promise} promise containing network response object
   */
  get (cardID, customerID) {
    return this.request('GET', `/customers/${customerID}/cards/${cardID}`, {})
  }

  /**
   * `CreditCard` `all` method.
   *
   * Retrieve all credit cards through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `customerID`       identifier for the customer
   *
   * Examples:
   *
   *     CreditCard().all('customer-id');
   *
   * @method
   * @param {string} customerID
   * @access public
   * @return {Promise} promise containing network response object
   */
  all (customerID) {
    return this.request('GET', `/customers/${customerID}/cards`, {})
  }

  /**
   * `CreditCard` `chargeByToken` method.
   *
   * Charge a credit card through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `token`       tokenized version of the card
   *   - `amount`      the amount to charge the card
   *   - `currency`    the amount to charge will be in (default `USD`)
   *   - `description` description for the charge
   *
   * Examples:
   *
   *     CreditCard().chargeByToken('some-token', 10.55);
   *
   * @method
   * @param {string} token
   * @param {number} amount
   * @param {string} description
   * @param {string} currency
   * @access public
   * @return {Promise} promise containing network response object
   */
  chargeByToken (token, amount, description, currency = 'USD') {
    return this.request('POST', `/payments/charges`, {
      amount: Number(amount).toFixed(2),
      token: token,
      currency: currency,
      description: description
    })
  }

  /**
   * `CreditCard` `chargeByID` method.
   *
   * Charge a credit card through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `cardID`      identifier of the card
   *   - `amount`      the amount to charge the card
   *   - `description` description for the charge
   *   - `currency`    the amount to charge will be in (default `USD`)
   *
   * Examples:
   *
   *     CreditCard().chargeByID('some-id', 10.55);
   *
   * @method
   * @param {string} cardID
   * @param {number} amount
   * @param {string} description
   * @param {string} currency
   * @access public
   * @return {Promise} promise containing network response object
   */
  chargeByID (cardID, amount, description, currency = 'USD') {
    return this.request('POST', `/payments/charges`, {
      amount: Number(amount).toFixed(2),
      cardOnFile: cardID,
      currency: currency,
      description: description,
      context: {
        mobile: false,
        isEcommerce: true
      }
    })
  }

  /**
   * `CreditCard` `receipt` method.
   *
   * Retrieve a charge through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `chargeID`      identifier of the charge
   *
   * Examples:
   *
   *     CreditCard().receipt('some-id');
   *
   * @method
   * @param {string} chargeID
   * @access public
   * @return {Promise} promise containing network response object
   */
  receipt (chargeID) {
    return this.request('GET', `/payments/charges/${chargeID}`, {})
  }

  /**
   * `CreditCard` `capture` method.
   *
   * Capture an existing charge through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `chargeID`      identifier of the charge
   *   - `amount`        amount to capture
   *
   * Examples:
   *
   *     CreditCard().capture('some-id');
   *
   * @method
   * @param {string} chargeID
   * @param {number} amount
   * @access public
   * @return {Promise} promise containing network response object
   */
  capture (chargeID, amount) {
    return this.request('POST', `/payments/charges/${chargeID}`, {
      amount: Number(amount).toFixed(2),
      context: {
        mobile: false,
        isEcommerce: true
      }
    })
  }

  /**
   * `CreditCard` `getRefund` method.
   *
   * Get information about a refund through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `chargeID`      identifier of the charge
   *   - `refundID`      identifier of the refund
   *
   * Examples:
   *
   *     CreditCard().getRefund('some-id');
   *
   * @method
   * @param {string} chargeID
   * @param {string} refundID
   * @access public
   * @return {Promise} promise containing network response object
   */
  getRefund (chargeID, refundID) {
    return this.request('GET', `/payments/charges/${chargeID}/refunds/${refundID}`, {})
  }

  /**
   * `CreditCard` `refund` method.
   *
   * Process a refund for a charge through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `chargeID`      identifier of the charge
   *   - `amount`        amount to capture
   *   - `reason`        reason for the refund
   *
   * Examples:
   *
   *     CreditCard().refund('some-id', 5.00, 'the reason');
   *
   * @method
   * @param {string} chargeID
   * @param {number} amount
   * @param {string} reason
   * @access public
   * @return {Promise} promise containing network response object
   */
  refund (chargeID, amount, reason) {
    return this.request('POST', `/payments/charges/${chargeID}/refunds`, {
      amount: Number(amount).toFixed(2),
      description: reason
    })
  }
}
