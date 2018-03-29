'use strict'

import Base from './abstract/base'

export default class BankAccount extends Base {
  /**
   * `BankAccount` `create` method.
   *
   * Create a bank account object through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `bank`
   *     - `name`           name of person
   *     - `routingNumber`  routing number for account
   *     - `accountNumber`  account number for account
   *     - `accountType`    account type (i.e. `PERSONAL_CHECKING` or `PERSONAL_SAVINGS`)
   *     - `phone`          phone number of person
   *   - `customerID`       identifier for the customer
   *   - `requestID`        identifier for the network request tracking
   *
   * Examples:
   *
   *     BankAccount().create({
   *        "name": "My Checking",
   *        "routingNumber": "XXXXX0358",
   *        "accountNumber": "XXXX4534",
   *        "accountType": "PERSONAL_CHECKING",
   *        "phone": "6047296480"
   *     }, 'customer-id', 'request-id');
   *
   * @method
   * @param {object} bank
   * @param {string} customerID
   * @param {string} requestID
   * @access public
   * @return {Promise} promise containing network response object
   */
  create (bank, customerID, requestID) {
    return this.request('POST', `/customers/${customerID}/bank-accounts`, bank, requestID)
  }

  /**
   * `BankAccount` `createFromToken` method.
   *
   * Create a bank account object from a token through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `token`       tokenized version of the bank account
   *   - `customerID`  identifier for the customer
   *   - `requestID`   identifier for the network request tracking
   *
   * Examples:
   *
   *     BankAccount().createFromToken(
   *        'some-token',
   *        'customer-id',
   *        'request-id'
   *     );
   *
   * @method
   * @param {string} token
   * @param {string} customerID
   * @param {string} requestID
   * @access public
   * @return {Promise} promise containing network response object
   */
  createFromToken (token, customerID, requestID) {
    return this.request('POST', `/customers/${customerID}/bank-accounts/createFromToken`, {
      value: token
    }, requestID)
  }

  /**
   * `BankAccount` `remove` method.
   *
   * Remove a bank account through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `bankID`       tokenized version of the bank account
   *   - `customerID`  identifier for the customer
   *   - `requestID`   identifier for the network request tracking
   *
   * Examples:
   *
   *     BankAccount().remove(
   *        'some-identifier',
   *        'customer-id',
   *        'request-id'
   *     );
   *
   * @method
   * @param {string} bankID
   * @param {string} customerID
   * @param {string} requestID
   * @access public
   * @return {Promise} promise containing network response object
   */
  remove (bankID, customerID, requestID) {
    return this.request('DELETE', `/customers/${customerID}/bank-accounts/${bankID}`, {}, requestID)
  }
}