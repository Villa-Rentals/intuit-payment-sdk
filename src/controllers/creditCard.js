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
}
