/** @jsx React.DOM */

var React = require('react');

var SongList = React.createClass({

  getInitialState: function() {
    return {
      songs: [
        {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
        {name: 'Titanium (feat. Sia)', artist: 'David Guetta, Sia'},
        {name: 'Sleepless - Radio Edit', artist: 'CAZZETTE, The High'},
        {name: 'Pompeii', artist: 'Bastille'},
      ],
      sortDirection: 1,
    };
  },

  _onSort: function(field) {
    var prev = this.state.songs;
    var direction = this.state.sortDirection;
    this.setState({
      songs: prev.sort(function(a, b) {
        if (!a.hasOwnProperty(field)) throw new Error(`The object does not have a property named "${field}" to sort on.`);
        return direction * a[field].localeCompare(b[field]);
      }),
      sortDirection: direction * -1
    });
  },

  render: function() {
    console.log(this.state)
    var songs = this.state.songs;
    return (
      <table>
        <thead>
          <tr>
            <th onClick={this._onSort.bind(this, 'name')}>Track</th>
            <th onClick={this._onSort.bind(this, 'artist')}>Artist</th>
            <th>Time</th>
          </tr>
        </thead>
      <tbody>
        {songs.map(function(song) {
          return (
            <tr>
              <td>{song.name}</td>
              <td>{song.artist}</td>
              <td>1:05</td>
            </tr>
          );
        })}
      </tbody>
      </table>
    );
  }
});

module.exports = SongList;
