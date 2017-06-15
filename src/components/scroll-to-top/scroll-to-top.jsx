import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class ScrollToTop extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    children: PropTypes.node,
    location: PropTypes.object,
    onWindowScroll: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.headerStore = this.props.store.headerStore;
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.scrollTopFocus();
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      let body = document.body,
          html = document.documentElement,
          docHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight ),
          topPos = document.documentElement.scrollTop || document.body.scrollTop,
          footerHeight = document.getElementById('pse-footer').offsetHeight;

      if(topPos > (window.innerHeight * 3) && topPos < (docHeight - footerHeight - window.innerHeight) ){
        this.headerStore.showBackToTop();
      } else {
        this.headerStore.hideBackToTop();
      }
    });
  }

  componentWillUnmount() {
    if (this.props.onWindowScroll) window.removeEventListener('scroll');
  }

  scrollTopFocus() {
    window.scrollTo(0, 0);
    this.rootAnchor.focus();
    this.headerStore.hideBackToTop();
  }

  handleBackToTopClick = (event) => {
    event.preventDefault();
    this.scrollTopFocus();
  }

  render() {
    return(
      <div id="PSE-wrapper">
        <span
          id="root-anchor"
          ref={ref => {this.rootAnchor = ref}}
          tabIndex="-1"
          className='sr-only' >Top of Page</span>
        {this.props.children}
        <a id="btn-back-top" href="#root"
          className={this.headerStore.showBackToTopBtn ? 'back-to-top' : 'back-to-top faded'} onClick={this.handleBackToTopClick}>
          <i aria-hidden="true" className="icon-arrowUp"></i>
          <span className="sr-only">Back to top</span>
        </a>
      </div>
    )
  }
}

export default withRouter(ScrollToTop);
