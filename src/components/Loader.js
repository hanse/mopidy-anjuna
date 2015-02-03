var React = require('react');

var Loader = React.createClass({

  getDefaultProps() {
    return {
      loading: false,
      text: 'Loading...'
    };
  },

  render() {
    if (this.props.loading) {
      return <div className='loader'>{this.props.text}</div>;
    }
    return this.props.children;
  }
});

module.exports = Loader;
