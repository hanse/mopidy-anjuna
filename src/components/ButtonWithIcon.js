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
      </button>
    );
  }
}

export default ButtonWithIcon;
