import React from 'react';
import PropTypes from 'prop-types';
import Joyride from 'fn-joyride-ui';
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
    this.mountMaxTries = 25;
    this.checkAnchorExistsTimeoutInterval = 500;
  }

  componentDidMount() {
    this.joyrideStore.tourPage = this.props.location;
    this.joyrideStore.initializeJoyride(this.joyride);

    //replace buggy joyride keydown listener affecting behavior of back button;
    document.body.removeEventListener('keydown', this.joyride.listeners.keyboard);
    document.body.addEventListener('keydown', this.handleTourEscapeKey);
  }

  componentWillReceiveProps(nextProps) {
    if(this.joyrideStore.tourPage !== nextProps.location) {
      //page change
      this.joyrideStore.stopTour();
      this.joyrideStore.tourPage = nextProps.location;

      if(!this.joyrideStore.tourIsDisabled && !this.joyrideStore.showTourIntroModal) {
        this.joyrideStore.runNow = this.joyrideStore.tourAutoStart;
        this.joyrideStore.setupTour();
      }
    }
  }

  handleCloseIntro = () => {
    // called when ESC or close button used on intro modal; Enable but do not start the tour
    this.joyrideStore.runNow = false;
    this.joyrideStore.tourAutoStart = false;
    this.joyrideStore.enableTour();
  }

  handleStartTour  = () => {
    this.joyrideStore.runNow = true;
    this.joyrideStore.enableTour();
  }

  handleDisableTour = () => {
    this.joyrideStore.disableTour();
  }

  handleTourEscapeKey = (e) => {
    const keyDown = (window.Event) ? e.which : e.keyCode;
    if (this.joyrideStore.showTourIntroModal && this.joyrideStore.runNow && keyDown === 27) {
      document.querySelector('.joyride-tooltip__close').click();
    }
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

  checkAnchorExists = (number, stepInfo) => {
    if (number < this.mountMaxTries && stepInfo.step) {
      if($(stepInfo.step.selector).get(0) !== undefined) {
        this.joyride.start(true, this.joyrideStore.currentSteps.peek(), stepInfo.index)
      } else {
        //retry. the component it's supposed to attach to may not be fully rendered.
        setTimeout(() => {
          this.checkAnchorExists(number + 1, stepInfo);
        }, this.checkAnchorExistsTimeoutInterval);
      }
    }
    return;
  }

  handleStepChange = (stepInfo) => {
    if (stepInfo.step && stepInfo.type === 'error:target_not_found') {
      this.checkAnchorExists(0, stepInfo);
    }
    /* Step type lifecycle:
    'error:target_not_found','step:before','tooltip:before','step:after','finished'*/
    if(stepInfo.type && stepInfo.type === 'tooltip:before') {
      //add jquery task to end of rendering queue. No time delay needed.
      setTimeout(() => {
        this.trapFocusWithinPopup($('.joyride-tooltip'));
      });
    }
    if (stepInfo.type && stepInfo.type !== 'finished') {
      this.joyrideStore.recordStepAsSeenInCookie(stepInfo);
    }
  }

  showModal = (shouldShow, modalID) => {
    if (shouldShow) {
      $(modalID).modal({backdrop: 'static'});
      $(modalID).modal('show');
    } else {
      $(modalID).modal('hide');
      $(modalID).data('bs.modal', null);
      $('.modal-backdrop').remove();
    }
  }

  renderTourIntroModal() {
    if(this.joyrideStore.showTourIntroModal){
      document.onkeydown = (evt) => {
        evt = evt || window.event;
        if (evt.keyCode == 27) {
          this.handleCloseIntro();
        }
      };
    }
    this.showModal(this.joyrideStore.showTourIntroModal, '#tour-intro-modal');
    return (
      <div id="tour-intro-modal"
        className="modal fade"
        role="dialog"
        tabIndex="-1"
        aria-labelledby="tour-modal-title">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="fn-modal-close" onClick={this.handleCloseIntro}>
                <i className="icon-close" aria-hidden="true"></i>
                <span className="sr-only">close window</span>
              </button>
              <h1 id="tour-modal-title">Welcome to Local Control</h1>
            </div>
              <div className="modal-body">
                <p>Follow the beacons to take a tour of the important features of this site.</p>
                <ul>
                  <li>To reactivate your tour, simply click &apos;Enable Site Walkthrough&apos; in the <i className="icon-help" aria-hidden="true"></i> Help Menu in the header.</li>
                  <li>To disable the tour, please click on &apos;Disable Site Walkthrough&apos; in the <i className="icon-help" aria-hidden="true"></i> Help menu.</li>
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
          steps={this.joyrideStore.currentSteps.peek()}
          run={this.joyrideStore.runNow}
          autoStart={this.joyrideStore.tourAutoStart}
          showOverlay={true}
          locale={{
            last: 'Finished',
            back: 'Back',
            next: 'Next'
          }}
          callback={this.handleStepChange}
          type="continuous"
          showStepsProgress={true}
          holePadding={2}
        />
      </div>
    )
  }
}
