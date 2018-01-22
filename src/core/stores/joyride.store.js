import {action, observable, computed} from 'mobx';
import {Beacons} from '../../content/tour-steps.json';
import {utilsService} from '../services/utils.service';
import $ from 'jquery';

class JoyrideStore {
	@action initializeJoyride(joyrideRef) {
		this.tourRef = joyrideRef;
		this.tourAutoStart = true;
		this.introModalSeen = document.cookie.indexOf('_fn_lc_tour') !== -1;
		this.tourIsDisabled = this.introModalSeen && utilsService.getCookie('_fn_lc_tour') === 'false';

		if(!this.tourIsDisabled && this.introModalSeen) {
			this.runNow = true;
			this.setupTour();
		}
	}

	@action toggleTour() {
		//used by header and footer
		if (this.tourIsDisabled) {
			this.tourAutoStart = true;
			this.runNow = true;
			this.enableTour();
		} else {
			this.disableTour();
		}
	}

	@action resetStepsSeen() {
		utilsService.setCookie('_fn_lc_tour_steps_seen', '', 365);
		this.currentSteps = this.stepsToShow;
	}

	@action disableTour() {
		this.stopTour();
		utilsService.setCookie('_fn_lc_tour', false);
		this.tourIsDisabled = true;
		this.runNow = false;
		this.tourAutoStart = false;
	}

	@action enableTour() {
		utilsService.setCookie('_fn_lc_tour', true);
		this.tourIsDisabled = false;
		this.resetStepsSeen();
		this.setupTour();
	}

	@action setupTour() {
		if(!this.tourIsDisabled && this.stepsToShow.length > 0) {
			if(!this.nextStepAnchorHasRendered && this.nextStepRenderAttempts++ < this.nextStepMaxRenderAttempts) {
				//Required anchor(s) have not been rendered yet. Wait to start the tour.
				setTimeout(() => {
					this.setupTour();
				}, 500);
				return;
			}
			this.nextStepRenderAttempts = 0;
			this.currentSteps = this.stepsToShow;
			if(this.tourRef.start) {
				//if runNow is false, this command will only show the beacons
				this.tourRef.start(this.runNow, this.currentSteps.peek(), 0);
			}
		} else {
			//All steps have been completed in this page.
			this.stopTour();
		}
	}

	@action stopTour() {
		if(this.tourRef.stop) {
			this.tourRef.stop();
		}
	}

	@action recordStepAsSeenInCookie(stepInfo) {
		if (stepInfo.action === 'next' || stepInfo.action === 'close' && stepInfo.type === 'step:after') {
			let stepsAlreadySeen = this.stepsSeen;
			let stepTitle = stepInfo.step.title;
			if (stepsAlreadySeen.indexOf(stepTitle) === -1) {
				stepsAlreadySeen.push(stepTitle);
				utilsService.setCookie('_fn_lc_tour_steps_seen', JSON.stringify(stepsAlreadySeen));
			}
		}
	}

	@action updatePlacement() {
		this.tourRef.calcPlacement();
	}

	@computed get stepsToShow() {
		let allStepsForThisPage;
		if (this.tourPage.includes('/app/')) {
			allStepsForThisPage = Beacons.AppDetail;
		} else {
			switch (this.tourPage) {
			case '/admin':
			case '/':
				allStepsForThisPage = Beacons.AdminDashboard;
				break;
			case '/admin/manage-apps':
				allStepsForThisPage = Beacons.ManageApps;
				break;
			case '/network':
				allStepsForThisPage = Beacons.NetworkStatus;
				break;
			default:
				allStepsForThisPage = [];
			}
		}
		let unseenSteps = allStepsForThisPage.filter(step => {
			return this.stepsSeen.indexOf(step.title) < 0;
		});
		return unseenSteps;
	}

	@computed get stepsSeen() {
		let stepsSeen = utilsService.getCookie('_fn_lc_tour_steps_seen');
		if (!stepsSeen || stepsSeen === '') {
			return [];
		} else {
			return JSON.parse(stepsSeen)
		}
	}

	@computed get nextStepAnchorHasRendered() {
		let nextStepAnchorHasRendered = true;
		const numStepsToPreload = 1;
		this.stepsToShow.slice(0, numStepsToPreload + 1).forEach(step => {
			if($(step.selector).get(0) == undefined) {
				nextStepAnchorHasRendered = false;
			}
		});
		return nextStepAnchorHasRendered;
	}

	@observable currentSteps = [];
	@observable tourPage = '';
	@observable tourRef = {};
	@observable tourIsDisabled = false;
	@observable tourAutoStart = true;
	@observable introModalSeen = document.cookie.indexOf('_fn_lc_tour') < 0;
	@observable runNow = false;
	// @observable stepIndex = 0;
	// @observable selector = '';

	nextStepRenderAttempts = 0;
	nextStepMaxRenderAttempts = 10;
}

export const joyrideStore = new JoyrideStore();
