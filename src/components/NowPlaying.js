import React, { PropTypes, Component } from 'react';

export default class NowPlaying extends Component {

  static propTypes = {
    coverURL: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className='NowPlaying'>
        <img src={this.props.coverURL} width='100%' />
      </div>
    );
  }
}
