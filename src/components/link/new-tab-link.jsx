import React from 'react';
import PropTypes from 'prop-types';

export default class NewTabLink extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func
  }

  render() {
    return (
      <a href={this.props.to} onClick={this.props.onClick} target="_blank" rel="noopener noreferrer" className={`new-tab-link ${this.props.className}`}>
        {this.props.children}
      </a>
    )
  }
}
