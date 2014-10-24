/** @jsx React.DOM */

var React = require('react');

var SongList = React.createClass({

  render: function() {
    var songs = [
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
      {name: 'Love Never Felt So Good', artist: 'Michael Jackson, Justin Timberlake'},
    ];

    return (
      <table>
      <tr>
        <th>Track</th>
        <th>Artist</th>
        <th>Time</th>
      </tr>
      {songs.map(function(song) {
        return (
          <tr>
            <td>{song.name}</td>
            <td>{song.artist}</td>
            <td>1:05</td>
          </tr>
        );
      })}
      </table>
    );
  }
});

module.exports = SongList;
