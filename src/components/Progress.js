import React, { Component } from 'react';
import { connect } from 'react-redux';

class Progress extends Component {
  static defaultProps = {
    trackPosition: 50
  };

  render() {
    return (
      <div
        style={{
          backgroundColor: '#111',
          position: 'absolute',
          height: '5px',
          width: '100%',
          top: 0
        }}
      >
        <div
          style={{
            height: '5px',
            width: `${this.props.trackPosition}%`,
            backgroundColor: '#e67e22',
            WebkitTransition: 'width 1s linear'
          }}
        />
      </div>
    );
  }
}

export default connect(state => ({
  trackPosition:
    state.status.timePosition / state.status.currentTrack.length * 100
}))(Progress);
