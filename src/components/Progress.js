import React, { PropTypes, Component } from 'react';

export default class Progress {
  static propTypes = {
    trackPosition: PropTypes.number.isRequired
  }

  static defaultProps = {
    trackPosition: 50
  }

  render() {
    return (
      <div style={{
        backgroundColor: '#34495e',
        position: 'absolute',
        height: '5px',
        width: '100%',
        top: 0
      }}>
        <div style={{
          height: '5px',
          width: `${this.props.trackPosition}%`,
          backgroundColor: '#e67e22',
          WebkitTransition: 'width 1s linear'
        }}></div>
      </div>
    );
  }
}
