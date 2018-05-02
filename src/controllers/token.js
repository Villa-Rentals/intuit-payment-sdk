'use strict'

import Base from './abstract/base'

export default class Token extends Base {
  /**
   * `Token` `create` method.
   *
   * Create a token from bank account or credit card through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `object`
   *     - `card`               required if bankaccount is empty
   *       - `number`           number on the card
   *       - `expMonth`         expiration month on the card
   *       - `expYear`          expiration year on the card
   *       - `name`             name on the card
   *       - `address`
   *         - `streetAddress`  street address of billing address
   *         - `city`           city of billing address
   *         - `region`         region of billing address
   *         - `country`        country of billing address
   *         - `postalCode`     postalCode of billing address
   *     - `bankAccount`        required if bankaccount is empty
   *       - `name`             name of person
   *       - `routingNumber`    routing number for account
   *       - `accountNumber`    account number for account
   *       - `accountType`      account type (i.e. `PERSONAL_CHECKING` or `PERSONAL_SAVINGS`)
   *       - `phone`            phone number of person
   *
   * Examples:
   *
   *     Token().create({
   *       "card": {
   *         "number": "4408041234567893",
   *         "expMonth": "12",
   *         "expYear": "2026",
   *         "name": "Test User",
   *         "address": {
   *           "streetAddress": "1245 Hana Rd",
   *           "city": "Richmond",
   *           "region": "VA",
   *           "country": "US",
   *           "postalCode": "44112"
   *         }
   *       }
   *     });
   *
   * @method
   * @param {object} object
   * @access public
   * @return {Promise} promise containing network response object
   */
  create (object) {
    return this.request('POST', `/payments/tokens`, object)
  }
}
