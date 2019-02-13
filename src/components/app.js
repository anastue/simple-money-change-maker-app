import React, {Component} from 'react';
import utils, {log} from '../utils';
import {CURRENCY_SIGN, CURRENCIES} from '../constants';
import MoneyChangeMaker from '../money_change_maker';
import FieldNumber from './field_number';

class App extends Component {
  state = {
    data: {
      amount: null,
    },
  };

  handleOnchange(name) {
    log.info('App.handleOnchange ', name, this.state.data);
    this.forceUpdate();
  }

  render() {
    log.info('App.render');
    const resultAmount = MoneyChangeMaker(this.state.data.amount, CURRENCIES);
    log.info('App.render.resultAmount ', resultAmount);
    return (
      <div className="container">
        <h1 className="text-center">Simple Money Change Maker</h1>
        <hr />
        <div className="row">
          <div className="col-sm-4" />
          <div className="col-sm-4">
            <FieldNumber
              name="amount"
              data={this.state.data}
              handleOnchange={this.handleOnchange.bind(this, 'amount')}
              forceUpdate
              inputProps={{
                scale: 2,
                thousandSeparator: true,
                fixedDecimalScale: true,
                prefix: CURRENCY_SIGN,
                placeholder: 'Please type amount here.',
              }}
            />
          </div>
          <div className="col-sm-4" />
        </div>
        <section>
          <div className="row">
            <div className="col-sm-3" />
            <div className="col-sm-6">
              <br />
              <h4>
                {resultAmount &&
                  `Your amount is ${CURRENCY_SIGN}${utils.fmtMoney(
                    this.state.data.amount,
                  )}`}
              </h4>
              <p>{resultAmount && `Your change is ${resultAmount}`}</p>
            </div>
            <div className="col-sm-3" />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
