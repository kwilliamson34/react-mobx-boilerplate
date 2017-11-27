import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
const portalRoot = document.getElementById('portal');

export default class Portal extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    portalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
