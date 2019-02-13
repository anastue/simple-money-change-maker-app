/*
 * TODO: separate it
 */

const assert = require('assert');

console.log(`
Welcome to Money Change Maker App ! 
`);

var q1 = `If 1.00 was passed as an argument, the output would be "Your change is 1 1 dollar bill"`;
var a1 = `Your change is 1 1 dollar bill`;
var q2 = `If .99 was passed as an argument, the output would be "Your change is 3 quarters, 2 dimes and 4 pennies"`;
var a2 = `Your change is 3 quarters, 2 dimes and 4 pennies`;
var q3 = `If 124.67 was passed as an argument, the output would be "Your change is 1 100 dollar bill, 1 20 dollar bill, 4 1 dollar bills, 2 quarters, 1 dime, 1 nickel and 2 pennies."`;
var a3 = `Your change is 1 100 dollar bill, 1 20 dollar bill, 4 1 dollar bills, 2 quarters, 1 dime, 1 nickel and 2 pennies`;

it(q1, () => {
  const res1 = calculate(1.00, CURRENCIES);
  assert.equal(a1, res1);
});

it(q2, () => {
  const res1 = calculate(.99, CURRENCIES);
  assert.equal(a2, res1);
});
it(q3, () => {
  const res1 = calculate(124.67, CURRENCIES);
  assert.equal(a3, res1);
});

const sortCurrencies = (list=[], key) => {
  if (
    !Array.isArray(list) ||
    key === undefined ||
    key.length == 0
  ) {
    return [];
  }
  list.sort((a, b) => {
    var k1 = a[key],
        k2 = b[key];
    // Compare the 2 dates
    if(k1 < k2) return 1;
    if(k1 > k2) return -1;
    return 0;
  })
  return list
}

const calculate = (amount = 0, currencies = []) => {
  if (
    !parseFloat(amount) ||
    !Array.isArray(currencies) ||
    currencies === undefined ||
    currencies.length == 0
  ) {
    return '';
  }
  const sortedCurrencies = sortCurrencies(currencies, 'amount')
  let remainAmount = amount
  let vals = []
  let vals2 = []
  for(const currency of sortedCurrencies){
    let divider = parseFloat(currency.amount);
    let qty = Math.floor(remainAmount/divider);
    remainAmount = fmtMoney(remainAmount % divider);
    if(!qty) continue
    let uom = (qty == 1)? currency.shortUom: currency.shortUoms
    vals.push({
      qty: qty,
      uom: uom
    })
    let text = `${qty} ${uom}`
    vals2.push(text)
  }
  const beautiText = convertToText(vals2)
  return beautiText
};

const convertToText = (list=[]) => {
  if (
    !Array.isArray(list) ||
    list === undefined ||
    list.length == 0
  ) {
    return '';
  }
  let val = 'Your change is '+([list.slice(0, -1).join(', '), list.slice(-1)[0]].join(list.length < 2 ? '' : ' and '));
  return val

}

const fmtMoney = (n, c, d, t) => {
  var c = isNaN((c = Math.abs(c))) ? 2 : c,
    d = d == undefined ? '.' : d,
    t = t == undefined ? ',' : t,
    s = n < 0 ? '-' : '',
    i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + '',
    j = (j = i.length) > 3 ? j % 3 : 0;
  var res =
    s +
    (j ? i.substr(0, j) + t : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
    (c
      ? d +
        Math.abs(n - i)
          .toFixed(c)
          .slice(2)
      : '');
  return removeExtraZeros(res, 2);
};

const removeExtraZeros = (s, min_digits) => {
  var i = s.indexOf('.');
  if (i == -1) return s;
  var last = i + min_digits;
  i = last + 1;
  while (i < s.length) {
    if (s[i] != '0') last = i;
    i++;
  }
  return s.slice(0, last + 1);
};

const CURRENCIES = [
  {
    amount: 100,
    uom: 'dollar bill',
    shortUom: '100 dollar bill',
    shortUoms: '100 dollar bills',
    type: 'paper'
  },
  {
    amount: 50,
    uom: 'dollar bill',
    shortUom: '50 dollar bill',
    shortUoms: '50 dollar bills',
    type: 'paper'
  },
  {
    amount: 20,
    uom: 'dollar bill',
    shortUom: '20 dollar bill',
    shortUoms: '20 dollar bills',
    type: 'paper'
  },
  {
    amount: 10,
    uom: 'dollar bill',
    shortUom: '10 dollar bill',
    shortUoms: '10 dollar bills',
    type: 'paper'
  },
  {
    amount: 5,
    uom: 'dollar bill',
    shortUom: '5 dollar bill',
    shortUoms: '5 dollar bills',
    type: 'paper'
  },
  {
    amount: 1,
    uom: 'dollar bill',
    shortUom: '1 dollar bill',
    shortUoms: '1 dollar bills',
    type: 'paper'
  },
  {
    amount: 0.25,
    uom: 'cents',
    shortUom: 'quarter',
    shortUoms: 'quarters',
    type: 'coin'
  },
  {
    amount: 0.10,
    uom: 'cents',
    shortUom: 'dime',
    shortUoms: 'dimes',
    type: 'coin'
  },
  {
    amount: 0.05,
    uom: 'cents',
    shortUom: 'nickel',
    shortUoms: 'nickels',
    type: 'coin'
  },
  {
    amount: 0.01,
    uom: 'cents',
    shortUom: 'penny',
    shortUoms: 'pennies',
    type: 'coin'
  }
]
