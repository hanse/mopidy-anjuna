import React from 'react';

class Loader extends React.Component {

  static defaultProps = { loading: false }

  render() {
    if (this.props.loading) {
      return (
        <div className='spinner'></div>
      );
    }
    return this.props.children;
  }
}

export default Loader;
