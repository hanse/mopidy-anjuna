import React from 'react';

class NowPlaying extends React.Component {

  static propTypes = {
    coverURL: React.PropTypes.string
  }

  render() {
    return (
      <div className='NowPlaying'>
        <img src={this.props.coverURL} width='100%' />
      </div>
    );
  }
}

export default NowPlaying;
