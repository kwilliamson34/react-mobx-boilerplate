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
      <div id="tour-intro-modal" className="modal fade" role="dialog" tabIndex="-1" aria-labelledby="feedback-modal-title">
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <button type="button" className="fn-modal-close" onClick={this.handleStartTour}>
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
                    <li>To reactivate your tour, simply click 'Enable Tour' in the <i className="icon-help" aria-hidden="true" /> Help Menu in the header.</li>
                    <li>To disable the tour, please click on 'Disable Tour' in the <i className="icon-help" aria-hidden="true" /> Help menu.</li>
                  </ul>
                </div>
                <div className="col-xs-12 text-center">
                  <button className="fn-secondary pull-left" onClick={this.handleDisableTour}>Skip Tour</button>
                  <button className="fn-primary pull-right" onClick={this.handleStartTour}>Start Tour</button>
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
        {this.renderTourIntroModal()}
        <Joyride
          ref={el => (this.joyride = el)}
          steps={this.joyrideStore.steps}
          run={this.joyrideStore.isReady}
          autoStart={true}
          showOverlay={true}
          type="continuous"
        />
      </div>
    )
  }
}
