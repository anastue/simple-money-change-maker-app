import * as MoneyChangeMaker from './money_change_maker';

import {log, sortCurrencies, fmtMoney} from './utils';

export const calculate = (amount = 0, currencies = []) => {
  log.info('MoneyChangeMaker.calculate');
  if (
    !parseFloat(amount) ||
    !Array.isArray(currencies) ||
    currencies === undefined ||
    currencies.length == 0
  ) {
    return '';
  }
  const sortedCurrencies = sortCurrencies(currencies, 'amount');
  let remainAmount = amount;
  let vals = [];
  let vals2 = [];
  for (const currency of sortedCurrencies) {
    let divider = parseFloat(currency.amount);
    let qty = Math.floor(remainAmount / divider);
    remainAmount = fmtMoney(remainAmount % divider);
    if (!qty) continue;
    let uom = qty == 1 ? currency.shortUom : currency.shortUoms;
    vals.push({
      qty: qty,
      uom: uom,
    });
    let text = `${qty} ${uom}`;
    vals2.push(text);
  }
  const beautiText = convertToText(vals2);
  return beautiText;
};

const convertToText = (list = []) => {
  log.info('MoneyChangeMaker.convertToText');
  if (!Array.isArray(list) || list === undefined || list.length == 0) {
    return '';
  }
  let val = [list.slice(0, -1).join(', '), list.slice(-1)[0]].join(
    list.length < 2 ? '' : ' and ',
  );
  return val;
};

export default calculate;
