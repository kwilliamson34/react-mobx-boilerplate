import React from 'react';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import { observer } from 'mobx-react';
import $ from 'jquery';

@observer
export default class JoyrideBase extends React.Component {
  static propTypes = {
    joyrideStore: PropTypes.object,
    location: PropTypes.string
  };

  constructor(props){
    super(props)
    this.joyrideStore = this.props.joyrideStore;
    this.mountMaxTries = 7;
    this.mountTries = 0;
  }

  componentDidMount() {
    this.joyrideStore.checkTourCookie(this.joyride, this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    this.joyrideStore.updateSteps(nextProps.location);
  }

  handleStartTour  = () => {
    this.joyrideStore.endTourIntro();
    this.joyrideStore.startTour();
  }

  handleDisableTour = () => {
    this.joyrideStore.disableTour();
  }

  trapFocusWithinPopup = (popup) => {
    const buttonArray = popup.find('button');
    const firstInput = buttonArray.first();
    const lastInput = buttonArray.last();

    /*set focus on first input*/
    firstInput.focus();

    /*redirect last tab to first input*/
    lastInput.on('keydown', function (e) {
     if ((e.which === 9 && !e.shiftKey)) {
       e.preventDefault();
       firstInput.focus();
     }
    });

    /*redirect first shift+tab to last input*/
    firstInput.on('keydown', function (e) {
      if ((e.which === 9 && e.shiftKey)) {
        e.preventDefault();
        lastInput.focus();
      }
    });
  }

  handleStepChange = (stepInfo) => {
    if (stepInfo.type && stepInfo.type === 'error:target_not_found') {
      this.joyrideStore.isReady = false;
      setTimeout(() => {
        if ($(stepInfo.step.selector).get(0) !== undefined) {
          this.joyrideStore.isReady = true;
          this.joyrideStore.handleStepChange(stepInfo);
          return;
        } else {
          if (++this.mountTries >= this.mountMaxTries) return;
          this.handleStepChange(stepInfo);
        }
      }, 2000);
    } else if(stepInfo.type && stepInfo.type === 'tooltip:before') {
      //add jquery task to end of rendering queue
      setTimeout(() => {
        this.trapFocusWithinPopup($('.joyride-tooltip'));
      });
    }
    this.joyrideStore.recordStepAsSeenInCookie(stepInfo);
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

  toggleIntroEnableWalkthrough = () => {
    this.joyrideStore.disableAutoStart();
    this.handleStartTour();
  }

  renderTourIntroModal() {
    if(this.joyrideStore.showTourIntroModal){
      document.onkeydown = (evt) => {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          this.toggleIntroEnableWalkthrough();
        }
      };
    }
    this.showModal(this.joyrideStore.showTourIntroModal, '#tour-intro-modal');
    return (
      <div id="tour-intro-modal" className="modal fade" role="dialog" tabIndex="-1" aria-labelledby="tour-modal-title">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="fn-modal-close" onClick={this.toggleIntroEnableWalkthrough}>
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
    return(
      <div id="walkthru">
        {this.renderTourIntroModal()}
        <Joyride
          ref={el => this.joyride = el}
          steps={this.joyrideStore.steps.peek()}
          run={this.joyrideStore.isReady}
          autoStart={this.joyrideStore.tourAutoStart}
          showOverlay={true}
          locale={{last: 'Finished'}}
          callback={this.handleStepChange}
          type="continuous"
          showStepsProgress={true}
          holePadding="0"
        />
      </div>
    )
  }
}
