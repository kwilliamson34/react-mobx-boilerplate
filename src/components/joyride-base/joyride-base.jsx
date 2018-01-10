import React from 'react';
import PropTypes from 'prop-types';
import Joyride from 'fn-joyride-ui';
import {observer} from 'mobx-react';
import $ from 'jquery';
import Modal from '../portals/modal';

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

    if(!this.joyrideStore.introModalSeen) {
      this.tourIntroModal.showModal();
    }

    //replace buggy joyride keydown listener affecting behavior of back button;
    document.body.removeEventListener('keydown', this.joyride.listeners.keyboard);
    document.body.addEventListener('keydown', this.handleTourEscapeKey);
  }

  componentWillReceiveProps(nextProps) {
    if(this.joyrideStore.tourPage !== nextProps.location) {
      //page change
      this.joyrideStore.stopTour();
      this.joyrideStore.tourPage = nextProps.location;

      if(!this.joyrideStore.tourIsDisabled) {
        this.joyrideStore.runNow = this.joyrideStore.tourAutoStart;
        this.joyrideStore.setupTour();
      }
    }
  }

  componentWillUnmount() {
    this.joyrideStore.stopTour();
  }

  handleCloseIntro = () => {
    // called when ESC or close button used on intro modal; Enable but do not start the tour
    this.joyrideStore.runNow = false;
    this.joyrideStore.tourAutoStart = false;
    this.tourIntroModal.hideModal();
    this.joyrideStore.enableTour();
  }

  handleStartTour  = () => {
    this.joyrideStore.runNow = true;
    this.tourIntroModal.hideModal();
    this.joyrideStore.enableTour();
  }

  handleDisableTour = () => {
    this.tourIntroModal.hideModal();
    this.joyrideStore.disableTour();
  }

  handleTourEscapeKey = (e) => {
    const keyDown = (window.Event) ? e.which : e.keyCode;
    if (this.joyrideStore.runNow && keyDown === 27) {
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

  renderTourIntroModal() {
    return <Modal
      id="tour-intro-modal"
      title="Welcome to Local Control"
      ref={i => this.tourIntroModal = i}
      primaryAction={this.handleStartTour}
      primaryButtonLabel="Start Walkthrough"
      secondaryAction={this.handleDisableTour}
      secondaryButtonLabel="Disable Walkthrough">
      <div className="modal-body">
        <p>Follow the beacons to take a tour of the important features of this site.</p>
        <ul>
          <li>To reactivate your tour, simply click &apos;Enable Site Walkthrough&apos; in the <i className="icon-help" aria-hidden="true"></i> Help Menu in the header.</li>
          <li>To disable the tour, please click on &apos;Disable Site Walkthrough&apos; in the <i className="icon-help" aria-hidden="true"></i> Help menu.</li>
        </ul>
      </div>
    </Modal>
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
