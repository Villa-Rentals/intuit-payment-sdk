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
   *   - `requestID`        identifier for the network request tracking
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
   *     }, 'customer-id', 'request-id');
   *
   * @method
   * @param {object} card
   * @param {string} customerID
   * @param {string} requestID
   * @access public
   * @return {Promise} promise containing network response object
   */
  create (card, customerID, requestID) {
    return this.request('POST', `/customers/${customerID}/cards`, card, requestID)
  }

  /**
   * `CreditCard` `createFromToken` method.
   *
   * Create a credit card object through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `token`            tokenized version of the card
   *   - `customerID`       identifier for the customer
   *   - `requestID`        identifier for the network request tracking
   *
   * Examples:
   *
   *     CreditCard().createFromToken('some-token', 'customer-id', 'request-id');
   *
   * @method
   * @param {object} token
   * @param {string} customerID
   * @param {string} requestID
   * @access public
   * @return {Promise} promise containing network response object
   */
  createFromToken (token, customerID, requestID) {
    return this.request('POST', `/customers/${customerID}/cards`, {
      value: token
    }, requestID)
  }

  /**
   * `CreditCard` `remove` method.
   *
   * Remove a credit card through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `cardID`           identifier of the card
   *   - `customerID`       identifier for the customer
   *   - `requestID`        identifier for the network request tracking
   *
   * Examples:
   *
   *     CreditCard().remove('identifier', 'customer-id', 'request-id');
   *
   * @method
   * @param {object} cardID
   * @param {string} customerID
   * @param {string} requestID
   * @access public
   * @return {Promise} promise containing network response object
   */
  remove (cardID, customerID, requestID) {
    return this.request('DELETE', `/customers/${customerID}/cards/${cardID}`, {}, requestID)
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
}
