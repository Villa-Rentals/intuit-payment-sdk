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
   *
   * Examples:
   *
   *     BankAccount().create({
   *        "name": "My Checking",
   *        "routingNumber": "XXXXX0358",
   *        "accountNumber": "XXXX4534",
   *        "accountType": "PERSONAL_CHECKING",
   *        "phone": "6047296480"
   *     }, 'customer-id');
   *
   * @method
   * @param {object} bank
   * @param {string} customerID
   * @access public
   * @return {Promise} promise containing network response object
   */
  create (bank, customerID) {
    return this.request('POST', `/customers/${customerID}/bank-accounts`, bank)
  }

  /**
   * `BankAccount` `createFromToken` method.
   *
   * Create a bank account object from a token through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `token`       tokenized version of the bank account
   *   - `customerID`  identifier for the customer
   *
   * Examples:
   *
   *     BankAccount().createFromToken(
   *        'some-token',
   *        'customer-id'
   *     );
   *
   * @method
   * @param {string} token
   * @param {string} customerID
   * @access public
   * @return {Promise} promise containing network response object
   */
  createFromToken (token, customerID) {
    return this.request('POST', `/customers/${customerID}/bank-accounts/createFromToken`, {
      value: token
    })
  }

  /**
   * `BankAccount` `remove` method.
   *
   * Remove a bank account through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `bankID`      tokenized version of the bank account
   *   - `customerID`  identifier for the customer
   *
   * Examples:
   *
   *     BankAccount().remove(
   *        'some-identifier',
   *        'customer-id'
   *     );
   *
   * @method
   * @param {string} bankID
   * @param {string} customerID
   * @access public
   * @return {Promise} promise containing network response object
   */
  remove (bankID, customerID) {
    return this.request('DELETE', `/customers/${customerID}/bank-accounts/${bankID}`, {})
  }

  /**
   * `BankAccount` `get` method.
   *
   * Retrieve a bank account's information through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `bankID`       tokenized version of the bank account
   *   - `customerID`  identifier for the customer
   *
   * Examples:
   *
   *     BankAccount().remove(
   *        'some-identifier',
   *        'customer-id'
   *     );
   *
   * @method
   * @param {string} bankID
   * @param {string} customerID
   * @access public
   * @return {Promise} promise containing network response object
   */
  get (bankID, customerID) {
    return this.request('GET', `/customers/${customerID}/bank-accounts/${bankID}`, {})
  }

  /**
   * `BankAccount` `all` method.
   *
   * Retrieve all bank accounts for a customer through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `customerID`  identifier for the customer
   *
   * Examples:
   *
   *     BankAccount().all(
   *        'customer-id'
   *     );
   *
   * @method
   * @param {string} customerID
   * @access public
   * @return {Promise} promise containing network response object
   */
  all (customerID) {
    return this.request('GET', `/customers/${customerID}/bank-accounts`, {})
  }

  /**
   * `BankAccount` `chargeByID` method.
   *
   * Charge a bank account for a customer through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `token`       tokenized version of the card
   *   - `amount`      the amount to charge the card
   *   - `description` description for the charge
   *
   * Examples:
   *
   *     BankAccount().chargeByToken(
   *        'some-token',
   *        10.55,
   *        'the description'
   *     );
   *
   * @method
   * @param {string} token
   * @param {number} amount
   * @param {string} description
   * @access public
   * @return {Promise} promise containing network response object
   */
  chargeByToken (token, amount, description) {
    return this.request('POST', `/payments/echecks`, {
      token: token,
      amount: Number(amount).toFixed(2),
      paymentMode: 'WEB',
      description: description
    })
  }

  /**
   * `BankAccount` `chargeByID` method.
   *
   * Charge a bank account for a customer through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `bankID`      id of the bank account
   *   - `amount`      the amount to charge the card
   *   - `description` description for the charge
   *
   * Examples:
   *
   *     BankAccount().chargeByID(
   *        'some-id',
   *        10.55,
   *        'the description'
   *     );
   *
   * @method
   * @param {string} bankID
   * @param {number} amount
   * @param {string} description
   * @access public
   * @return {Promise} promise containing network response object
   */
  chargeByID (bankID, amount, description) {
    return this.request('POST', `/payments/echecks`, {
      bankAccountOnFile: bankID,
      amount: Number(amount).toFixed(2),
      paymentMode: 'WEB',
      description: description
    })
  }

  /**
   * `BankAccount` `receipt` method.
   *
   * Get a receipt of a previous charge through the Intuit Quickbooks payment API
   *
   * Required Options:
   *   - `checkID`     id of the charge
   *
   * Examples:
   *
   *     BankAccount().receipt(
   *        'some-id',
   *     );
   *
   * @method
   * @param {string} checkID
   * @access public
   * @return {Promise} promise containing network response object
   */
  receipt (checkID) {
    return this.request('GET', `/payments/echecks/${checkID}`, {})
  }
}
