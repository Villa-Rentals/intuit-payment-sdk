# Intuit Quickbooks Payment API

[Intuit](http://intuit.com/) payment API for processing eCheck and Credit Card transactions.

This module lets you add, remove, charge, and refund Credit Cards & eChecks using Intuit in your Node.js applications.

## Install

```js
$ npm i -s git+ssh://git@github.com:Villa-Rentals/intuit-payment-sdk.git

```

## Usage

#### Configure Strategy

The Intuit Quickbooks Payment API authenticates using the OAuth 2.0 tokens previously provided (see [passport-intuit](https://github.com/Villa-Rentals/passport-intuit) for more information on getting these tokens). The SDK requires the version of the API along with a flag for production or development access.

```js
new Intuit({
  production: false,
  version: 'v4'
});
```

#### Making Requests

See the [documentation](https://villa-rentals.github.io/intuit-payment-sdk/) for more information about the SDK.

## Tests

The access_token and realmId are required for the tests to pass. These can be obtained through the [OAuth 2.0 authentication procedure](https://developer.intuit.com/docs/00_quickbooks_online/2_build/10_authentication_and_authorization). Once these tokens have been acquired, create a .env file from the [.env.example](.env.example) file and provide the tokens. These will be used to authenticate your requests.

```bash
$ npm install --dev
$ npm test
```
## License

[The MIT License](http://opensource.org/licenses/MIT)
