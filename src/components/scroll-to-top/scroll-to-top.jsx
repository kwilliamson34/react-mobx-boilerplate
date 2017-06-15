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
      var bodyRect = document.body.getBoundingClientRect(),
          footerElem = document.getElementById('pse-footer').getBoundingClientRect(),
          footerOffset   = footerElem.top - bodyRect.top;
      console.log('================================');
      console.log('scrollTop: ' + window.pageYOffset);
      console.log('body: ' + footerOffset);
      console.log('footerElemTop: ' + footerElem.top);
      console.log('footerOffset: ' + footerOffset);
      console.log('bodyRect: ' + bodyRect.top);
      console.log('================================');
      let topPos = window.pageYOffset;

      if(topPos > this.headerStore.backToTopOffset && topPos < footerOffset
      ){
        this.headerStore.showBackToTop();
      }else{
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
