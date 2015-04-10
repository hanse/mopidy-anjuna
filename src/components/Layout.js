import React from 'react';

export class TitleBar extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export class FlexibleArea extends React.Component {
  render() {
    return (
      <div style={{display: 'flex'}}>
        {this.props.children}
      </div>
    );
  }
}

export class Column extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
