/** @jsx React.DOM */

var React = require('react');
var Tracklist = require('./Tracklist');
var PlayerControls = require('./PlayerControls');
var Playlists = require('./Playlists');

var MopidyService = require('../services/MopidyService');

var App = React.createClass({

  render: function() {
    return (
      <div className='foo'>
        <header>
          <h1>Harley</h1>
        </header>
        <div className='flex'>
        <aside className='sidebar'>
          <Playlists />
        </aside>
        <section className='main'>
          <Tracklist />
        </section>
        </div>
        <footer>
          <PlayerControls />
        </footer>
      </div>
    );
  }
});

module.exports = App;
