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
    /* The portal element is inserted in the DOM tree after
    the Modal's children are mounted, meaning that children
    will be mounted on a detached DOM node. */
    portalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
