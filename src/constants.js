import * as constants from './constants';

export const modeEnv = process.env.NODE_ENV || 'development';

export const CURRENCY_SIGN = `$`

export const CURRENCIES = [
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

export default constants;

