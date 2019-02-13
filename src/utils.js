/* eslint-disable */
import * as utils from './utils';

import {modeEnv} from './constants';

var _isDevelopedMode = modeEnv && modeEnv === 'development' ? true : false;

export const log = {
  info: function() {
    const args = Array.prototype.slice.call(arguments);
    if (!_isDevelopedMode) return;
    console.log.apply(console, args);
  },
  warn: function() {
    const args = Array.prototype.slice.call(arguments);
    if (!_isDevelopedMode) return;
    console.warn.apply(console, args);
  },
  error: function() {
    const args = Array.prototype.slice.call(arguments);
    if (!_isDevelopedMode) return;
    console.error.apply(console, args);
  },
};

export const sortCurrencies = (list = [], key) => {
  if (!Array.isArray(list) || key === undefined || key.length == 0) {
    return [];
  }
  list.sort((a, b) => {
    var k1 = a[key],
      k2 = b[key];
    // Compare the 2 dates
    if (k1 < k2) return 1;
    if (k1 > k2) return -1;
    return 0;
  });
  return list;
};

export const _extends =
  Object.assign ||
  function(target) {
    for (let i = 1; i < arguments.length; i++) {
      const source = arguments[i];
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

export const fmtMoney = (n, c, d, t) => {
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

export default utils;
