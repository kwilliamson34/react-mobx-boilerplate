import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.scrollTopFocus();
    }
  }

  scrollTopFocus() {
    window.scrollTo(0, 0);
    this.rootAnchor.focus();
  }

  handleBackToTopClick = (event) => {
    event.preventDefault();
  }

  render() {
    return(
      <div id="PSE-wrapper">
        <span ref={ref => {this.rootAnchor = ref}} tabIndex="-1" className='sr-only' id="root-anchor">Top of Page</span>
        {this.props.children}
        <a href="#root" className={} onClick={this.handleBackToTopClick}>
          <i aria-hidden="true" className="icon-arrowUp"></i>
          <span className="sr-only">Back to top</span>
        </a>
      </div>
    )

  }
}

ScrollToTop.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
}

export default withRouter(ScrollToTop);
