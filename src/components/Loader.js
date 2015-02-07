var React = require('react');

var Loader = React.createClass({

  getDefaultProps() {
    return {
      loading: false,
    };
  },

  render() {
    if (this.props.loading) {
      return (
        <div className='spinner'></div>
      );
    }
    return this.props.children;
  }
});

module.exports = Loader;
