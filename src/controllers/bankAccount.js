'use strict'

import Base from './abstract/base'

export default class BankAccount extends Base {
  /**
   * `BankAccount` `create` method.
   *
   * Create a bank account object through the Intuit Quickbooks payment API
   *
   *
   * Required Options:
   *   - `bank`
   *     - `name`           name of person
   *     - `routingNumber`  routing number for account
   *     - `accountNumber`  account number for account
   *     - `accountType`    account type (i.e. `PERSONAL_CHECKING` or `PERSONAL_SAVINGS`)
   *     - `phone`          phone number of person
   *   - `customerID`     identifer for the customer
   *
   * Examples:
   *
   *     BankAccount().create({
   *        "name": "My Checking",
   *        "routingNumber": "XXXXX0358",
   *        "accountNumber": "XXXX4534",
   *        "accountType": "PERSONAL_CHECKING",
   *        "phone": "6047296480"
   *     });
   *
   * @method
   * @param {object} bank
   * @access public
   * @return {Promise} promise containing network response object
   */
  create (bank, customerID, requestID) {
    return this.request('POST', `/customers/${customerID}/bank-accounts`, bank, requestID)
  }
}
