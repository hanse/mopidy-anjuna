/** @jsx React.DOM */

var React = require('react');
var SongList = require('./SongList');
var PlayerControls = require('./PlayerControls');

var App = React.createClass({

  render: function() {
    return (
      <div className='foo'>
        <header>
          <h1>Harley</h1>
        </header>
        <div className='flex'>
        <aside className='sidebar'>Stuff</aside>
        <section className='main'>
          <SongList />
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
