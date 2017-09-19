import React from 'react';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import { observer, inject } from 'mobx-react';
import $ from 'jquery';

@inject('store')
@observer
export default class JoyrideBase extends React.Component {
  static propTypes = {
    store: PropTypes.object,
    location: PropTypes.string
  };

  constructor(props){
    super(props)
    this.joyrideStore = this.props.store.joyrideStore;
  }

  componentDidMount() {
    this.joyrideStore.checkTourCookie(this.joyride, this.props.location);
  }

  componentWillReceiveProps() {
    this.joyrideStore.updateSteps(this.props.location);
  }

  handleStartTour  = () => {
    this.joyrideStore.endTourIntro();
    this.joyrideStore.startTour();
  }

  handleDisableTour = () => {
    this.joyrideStore.disableTour();
  }

  hideIntroModal = () => {
    this.joyrideStore.toggleIntroModal();
  }

  showModal = (shouldShow, modalID) => {
    if (shouldShow) {
      $(modalID).modal({backdrop: 'static'});
      $(modalID).modal('show');
    } else {
      $(modalID).modal('hide');
      $(modalID).data('bs.modal', null);
    }
  }

  renderTourIntroModal() {
    this.showModal(this.joyrideStore.showTourIntroModal, '#tour-intro-modal');
    return (
      <div id="tour-intro-modal" className="modal fade" role="dialog" tabIndex="-1" aria-labelledby="tour-modal-title">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="fn-modal-close" onClick={this.handleStartTour}>
                <i className="icon-close" aria-hidden="true"></i>
                <span className="sr-only">close window</span>
              </button>
              <h1 id="tour-modal-title">Welcome to Local Control</h1>
            </div>

              <div className="modal-body">
                <p>Follow the beacons to take a tour of the important features of this site.</p>
                <ul>
                  <li>To reactivate your tour, simply click 'Enable Site Walkthrough' in the <i className="icon-help" aria-hidden="true" /> Help Menu in the header.</li>
                  <li>To disable the tour, please click on 'Disable Site Walkthrough' in the <i className="icon-help" aria-hidden="true" /> Help menu.</li>
                </ul>
              </div>

              <div className="modal-footer">
                <button className="fn-secondary pull-left" onClick={this.handleDisableTour}>Disable Walkthrough</button>
                <button className="fn-primary pull-right" onClick={this.handleStartTour}>Start Walkthrough</button>
              </div>

          </div>
        </div>
      </div>
    )
  }

  render(){
    console.log('render', this.joyrideStore.showTourIntroModal);
    return(
      <div id="walkthru">
        {this.renderTourIntroModal()}
        <Joyride
          ref={el => this.joyride = el}
          steps={this.joyrideStore.steps.peek()}
          run={this.joyrideStore.isReady}
          autoStart={true}
          showOverlay={true}
          type="continuous"
          showStepsProgress={true}
          holePadding="0"
        />
      </div>
    )
  }
}
