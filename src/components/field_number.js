import React, {Component} from 'react';
import NumberFormat from 'react-number-format';

import {log} from '../utils';

export default class FieldNumber extends Component {
  constructor(props) {
    log.info('FieldNumber.init');
    super(props);
    var val = props.data[props.name] || null;
    this.state = {
      input_val: val,
      is_changed: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    log.info('FieldNumber.getDerivedStateFromProps');
    var new_val = props.data[props.name];
    if (state.input_val !== new_val) {
      return {
        input_val: new_val,
      };
    }
    return null;
  }

  componentDidMount() {}

  render() {
    log.info('FieldNumber.render');
    return (
      <NumberFormat
        className={'form-control text-right'}
        onBlur={this.handleOnBlur}
        value={this.state.input_val}
        type={'text'}
        decimalScale={this.props.scale || 2}
        onValueChange={this.onValueChange}
        {...this.props.inputProps}
      />
    );
  }

  handleOnBlur = () => {
    log.info('FieldNumber.handleOnBlur');
    /* we dont need it? */
    return;
    /*
    // Open this if you want onBlur function
    const {handleOnBlur, handleOnchange} = this.props
    handleOnBlur && handleOnBlur();
    handleOnchange && handleOnchange();
    */
  };

  onValueChange = values => {
    log.info('FieldNumber.onValueChange');
    const {formattedValue, value, floatValue} = values;
    let val = floatValue;
    if (this.props.type === 'text') {
      val = value;
    }
    const {forceUpdate, handleOnchange} = this.props;
    this.props.data[this.props.name] = val;
    if (forceUpdate && handleOnchange) handleOnchange();
  };
}
