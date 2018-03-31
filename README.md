# Intuit Quickbooks Payment API

[Intuit](http://intuit.com/) payment API for processing eCheck and Credit Card transactions.

This module lets you add, remove, charge, and refund Credit Cards & eChecks using Intuit in your Node.js applications.

## Install

```js
$ npm i -s git+ssh://git@github.com:VillaRentals/intuit-payment-sdk.git

```

## Usage

#### Configure Strategy

The Intuit Quickbooks Payment API authenticates using the OAuth 2.0 tokens previously provided (see [passport-intuit](https://github.com/VillaRentals/passport-intuit) for more information on getting these tokens). The SDK requires the version of the API along with a flag for production or development access.

```js
new Intuit({
  production: false,
  version: 'v4'
});
```

#### Making Requests

See the [documentation](docs/index.html) for more information about the SDK.

## Work in Progress

Tokenization of the bank accounts or credit cards does not work. There is an authentication error with the Intuit servers.

## Tests

```bash
$ npm install --dev
$ npm test
```
## License

[The MIT License](http://opensource.org/licenses/MIT)
