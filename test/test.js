var paymentEncode = require(__dirname + '/../paymentEncoder')
var assert = require('assert')

var consumer = function (buff) {
  var curr = 0
  return function consume (len) {
    return buff.slice(curr, curr += len)
  }
}

describe('Payment Decode Encode', function () {
  it('should return the right decoding', function (done) {
    this.timeout(0)
    var testCase = [
      {skip: false, range: false, precent: true, output: 12, amountOfUnits: 3213213},
      {skip: true, range: false, precent: false, output: 14, amountOfUnits: 321321},
      {skip: false, range: false, precent: false, output: 2, amountOfUnits: 321321},
      {skip: true, range: true, precent: false, output: 0, amountOfUnits: 1000000},
      {skip: false, range: false, precent: true, output: 1, amountOfUnits: 321321321},
      {skip: true, range: true, precent: false, output: 5, amountOfUnits: 10000003321},
      {skip: false, range: false, precent: true, output: 20, amountOfUnits: 100000021000},
      {skip: true, range: false, precent: false, output: 22, amountOfUnits: 1000000210002},
      {skip: false, range: false, precent: true, output: 11, amountOfUnits: 321},
      {skip: true, range: true, precent: true, output: 10, amountOfUnits: 1},
      {skip: true, range: true, precent: true, output: 10, amountOfUnits: 1323004030000}
    ]

    for (var i = 0; i < testCase.length; i++) {
      var code = paymentEncode.encode(testCase[i])
      var decode = paymentEncode.decode(consumer(code))
      assert.equal(testCase[i].skip, decode.skip, 'skip encode has problems')
      assert.equal(testCase[i].range, decode.range, 'range encode has problems')
      assert.equal(testCase[i].precent, decode.precent, 'precent encode has problems')
      assert.equal(testCase[i].output, decode.output, 'output encode has problems')
      assert.equal(testCase[i].amountOfUnits, decode.amountOfUnits, 'amountOfUnits encode has problems')
    }
    done()
  })

  it('should return the right decoding for bulk operations', function (done) {
    this.timeout(0)
    var testCase = [
      {skip: false, range: false, precent: true, output: 12, amountOfUnits: 3213213},
      {skip: true, range: false, precent: false, output: 14, amountOfUnits: 321321},
      {skip: false, range: false, precent: false, output: 2, amountOfUnits: 321321},
      {skip: true, range: true, precent: false, output: 0, amountOfUnits: 1000000},
      {skip: false, range: false, precent: true, output: 1, amountOfUnits: 321321321},
      {skip: true, range: true, precent: false, output: 5, amountOfUnits: 10000003321},
      {skip: false, range: false, precent: true, output: 20, amountOfUnits: 100000021000},
      {skip: true, range: false, precent: false, output: 22, amountOfUnits: 1000000210002},
      {skip: false, range: false, precent: true, output: 11, amountOfUnits: 321},
      {skip: true, range: true, precent: true, output: 10, amountOfUnits: 1},
      {skip: true, range: true, precent: true, output: 10, amountOfUnits: 1323004030000}
    ]

    var code = paymentEncode.encodeBulk(testCase)
    var decode = paymentEncode.decodeBulk(consumer(code))

    for (var i = 0; i < testCase.length; i++) {
      assert.equal(testCase[i].skip, decode[i].skip, 'skip encode has problems')
      assert.equal(testCase[i].range, decode[i].range, 'range encode has problems')
      assert.equal(testCase[i].precent, decode[i].precent, 'precent encode has problems')
      assert.equal(testCase[i].output, decode[i].output, 'output encode has problems')
      assert.equal(testCase[i].amountOfUnits, decode[i].amountOfUnits, 'amountOfUnits encode has problems')
    }
    done()
  })

  it('should throw out of bounds error', function (done) {
    this.timeout(0)
    var testCase = [
      {skip: false, range: false, precent: true, output: 32, amountOfUnits: 3213213},
      {skip: true, range: true, precent: false, output: 8192, amountOfUnits: 321321}
    ]

    for (var i = 0; i < testCase.length; i++) {
      assert.throws(function () {
        paymentEncode.encode(testCase[i])
      }, 'Output value is out of bounds'
      , 'Should Throw Error')
    }
    done()
  })

  it('should throw negative error', function (done) {
    var testCase = {skip: true, range: true, precent: false, output: -1, amountOfUnits: 321321}
    assert.throws(function () {
      paymentEncode.encode(testCase)
    }, 'Output Can\'t be negative'
    , 'Should Throw Error')
    done()
  })

  it('should throw not output error', function (done) {
    var testCase = {skip: true, range: true, precent: true, amountOfUnits: 1323004030000}
    assert.throws(function () {
      paymentEncode.encode(testCase)
    }, 'Needs output value'
    , 'Should Throw Error')
    done()
  })

  it('should throw not output error', function (done) {
    var testCase = {skip: true, range: true, precent: true, output: 12}
    assert.throws(function () {
      paymentEncode.encode(testCase)
    }, 'Needs amount value'
    , 'Should Throw Error')
    done()
  })

})
