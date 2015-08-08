import React, { PropTypes, Component } from 'react';

export default class Scrollable extends Component {
  static propTypes = {
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    flex: PropTypes.number
  }

  static defaultProps = {
    flex: 1
  }

  __focused = false

  state = {
    focus: false
  }

  onFocus() {
    this.__focused = true;
  }

  onBlur() {
    this.__focused = false;
  }

  render() {
    return (
      <div tabIndex={-1} onFocus={::this.onFocus} onBlur={::this.onBlur}
        style={{
          flex: this.props.flex,
          backgroundColor: this.state.focus && 'yellow'
        }}
        className='scrollable-section'>
        {this.props.children}
      </div>
    );
  }
}
