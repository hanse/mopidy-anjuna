import React from 'react';

class NowPlaying extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.coverURL} width='100%' />
      </div>
    );
  }
}

export default NowPlaying;
