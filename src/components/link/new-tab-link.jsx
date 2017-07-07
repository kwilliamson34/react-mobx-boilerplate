import React from 'react';
import PropTypes from 'prop-types';

export default class NewTabLink extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    showIcon: PropTypes.bool,
    onClick: PropTypes.func
  }

  render() {
    return (
      <a href={this.props.to}
        onClick={this.props.onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={`new-tab-link ${this.props.className}`}>
        {this.props.children}
        <span className="sr-only">&hellip;Link will open in a new browser tab.</span>
        {this.props.showIcon && <i className="icon-external-site" aria-hidden="true" />}
      </a>
    )
  }
}
