/** @jsx React.DOM */

var React = require('react');

var PlayerControls = React.createClass({

  render: function() {
    return (
      <div className='controls'>
        <button><i className='fa fa-step-backward' /></button>
        <button className='play-button'><i className='fa fa-play' /></button>
        <button><i className='fa fa-step-forward' /></button>
      </div>
    );
  }
});

module.exports = PlayerControls;
