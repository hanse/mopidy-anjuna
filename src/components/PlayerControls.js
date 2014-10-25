/** @jsx React.DOM */

var React = require('react');

var PlayerControls = React.createClass({

  getInitialState: function() {
    return {
      isPlaying: false,
    };
  },

  togglePlay: function() {
    this.setState({isPlaying: !this.state.isPlaying});
  },

  render: function() {
    var playOrPause = this.state.isPlaying ? 'fa fa-pause' : 'fa fa-play';
    return (
      <div className='controls'>
        <button><i className='fa fa-step-backward' /></button>
        <button className='play-button' onClick={this.togglePlay}><i className={playOrPause} /></button>
        <button><i className='fa fa-step-forward' /></button>
      </div>
    );
  }
});

module.exports = PlayerControls;
