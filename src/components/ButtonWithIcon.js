import React from 'react';

class ButtonWithIcon extends React.Component {

  static propTypes = {
    iconName: React.PropTypes.string,
    onClick: React.PropTypes.func
  }

  render() {
    return (
      <button onClick={this.props.onClick}>
        <i className={'fa fa-' + this.props.iconName} />
        {this.props.children}
      </button>
    );
  }
}

export default ButtonWithIcon;
