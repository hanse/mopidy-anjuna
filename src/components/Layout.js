import React from 'react';
import '../styles/layout.styl';

export class TitleBar extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export class FlexibleArea extends React.Component {
  static propTypes = {}

  render() {
    return (
      <div className={'flex'}>
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
