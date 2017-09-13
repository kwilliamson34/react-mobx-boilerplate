import React from 'react';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import { observer, inject } from 'mobx-react';
import $ from 'jquery';

@inject('store')
@observer
export default class JoyrideBase extends React.Component {
  static propTypes = {
		store: PropTypes.object
	};

  constructor(props){
    super(props)
    this.joyrideStore = this.props.store.joyrideStore;
  }

  componentDidMount() {
    console.log('base cdm');
    let cookieVal = this.joyrideStore.checkWalkthruCookie();
    console.log('cookieVal = ' + cookieVal);
    //check for presence of cookie
    if(cookieVal){
      console.log('cookie reads true;');
      if(!this.joyrideStore.showWalkthruIntroModal){
        this.joyrideStore.initJoyride(this.joyride);
      }

    } else if(cookieVal === ''){
      //no cookie present; show walkthru intro
      console.log('cookie not present');
      this.joyrideStore.showWalkthruIntroModal = true;
    } else {
      //cookie val is false
      console.log('false cookie val');
      this.joyrideStore.disableWalkthru();
    }
  }

  handleStartWalkthru  = () => {
    this.joyrideStore.toggleIntroModal();
    this.joyrideStore.initJoyride(this.joyride);
  }

  handleDisableWalkthru = () => {
    this.joyrideStore.disableWalkthru();
  }

  showModal = (shouldShow, modalID) => {
    if (shouldShow) {
      $(modalID).modal({backdrop: 'static'});
    } else {
      $(modalID).modal('hide');
      $(modalID).data('bs.modal', null);
    }
  }

  hideIntroModal = () => {
    this.joyrideStore.toggleIntroModal();
  }

  renderWalkthruIntroModal(showIntroModal) {
    this.showModal(showIntroModal, '#walkthru-intro-modal');
    return (
      <div id="walkthru-intro-modal" className="modal fade" role="dialog" tabIndex="-1" aria-labelledby="feedback-modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.hideIntroModal}>
                <i className="icon-close" aria-hidden="true"></i>
                <span className="sr-only">close window</span>
              </button>
              <div className="row no-gutters">
                <div className="col-xs-12">
                  <h1 id="feedback-modal-title" className="as-h2">Welcome to Local Control</h1>
                  <p>Follow the beacons to take a tour of the important features of this site.</p>
                  <p>You can:</p>
                  <ul>
                    <li>To cancel the tour at any time, use the close icon "x".</li>
                    <li>To reactivate your tour, simply click 'Enable Tour' in the Help Menu in the header.</li>
                    <li>To disable the tour, please click on 'Disable Tour' in the Help menu.</li>
                  </ul>
                </div>
                <div className="col-xs-12 text-center">
                  <button className="fn-secondary pull-left" onClick={this.handleDisableWalkthru}>Skip Tour</button>
                  <button className="fn-primary pull-right" onClick={this.handleStartWalkthru}>Start Tour</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  render(){
    return(
      <div id="walkthru">
        {this.joyrideStore.showWalkthruIntroModal &&
          this.renderWalkthruIntroModal(this.joyrideStore.showWalkthruIntroModal)
        }
        {this.joyrideStore.showWalkthru &&  this.joyrideStore.showWalkthruIntroModal &&
          <Joyride
            ref={c => (this.joyride = c)}
            steps={this.joyrideStore.steps}
            run={this.joyrideStore.isReady}
            autoStart={true}
            showOverlay={true}
            type="continuous"
          />
        }
      </div>
    )
  }
}
