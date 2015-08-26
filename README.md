# Payment-Encoder
[![Build Status](https://travis-ci.org/Colored-Coins/Payment-Encoder.svg?branch=master)](https://travis-ci.org/Colored-Coins/Payment-Encoder) [![Coverage Status](https://coveralls.io/repos/Colored-Coins/Payment-Encoder/badge.svg?branch=master)](https://coveralls.io/r/Colored-Coins/Payment-Encoder?branch=master) [![npm version](https://badge.fury.io/js/cc-payment-encoder.svg)](http://badge.fury.io/js/cc-payment-encoder)  [![npm version](http://slack.coloredcoins.org/badge.svg)](http://slack.coloredcoins.org)

Payment-Encoder provides the encode/decode functions between a Colored Coins payment Object to buffer

### Installation

```sh
$ npm install cc-payment-encoder
```


### Encode

Params:

- paymentObject - A standard Colored Coins payment object with the following properties:

```js
{
  // Skip input after reading asset
  skip: "Boolean"

  // Range or fixed value output
  range: "Boolean"

  // Precent or fixed amount
  precent: "Boolean"

  // Output to send asset to - max value is 15 if range is false and 8191 if true
  output: "Number"

  // Total amount of units to send
  amountOfUnits: "Number"
}

```

Returns a new Buffer holding the encoded payment.

##### Example:

```js
var paymentEncode = require('cc-payment-encoder')
var paymentObject = {
    skip: false,
    range: false,
    precent: true,
    output: 1,
    amountOfUnits: 321321321
}

var code = paymentEncode.encode(paymentObject)

console.log(code) // Will print: <Buffer 21 80 99 37 cb 48>
```

### Decode

Params:

- consume - takes a consumable buffer (You can use [buffer-consumer] like in the example to create one)

Returns a Colored Coins payment Object

##### Example:

```js
var paymentEncode = require('cc-payment-encoder')
var consumer = require('buffer-consumer')

var decode = paymentEncode.decode(consumer(code))
var codeBuffer = new Buffer([0x82,0x76,0x0e,0x1b,0x48])

console.log(paymentEncode.decode(consumer(codeBuffer)))
// Will print:
// {
//  skip: false,
//  range: false,
//  precent: true,
//  output: 1,
//  amountOfUnits: 321321321
//  }
```

### Testing

In order to test you need to install [mocha] globaly on your machine

```sh
$ cd /"module-path"/cc-payment-Encoder
$ mocha
```


License
----

MIT


[mocha]:https://www.npmjs.com/package/mocha
[buffer-consumer]:https://www.npmjs.com/package/buffer-consumer