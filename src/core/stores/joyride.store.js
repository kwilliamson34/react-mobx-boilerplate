import { action, observable, computed } from 'mobx';
import { Beacons } from '../../content/tour-steps.json';
import $ from 'jquery';

class JoyrideStore {
	@action initializeJoyride(joyrideRef) {
		this.tourRef = joyrideRef;
		this.tourAutoStart = true;
		this.tourIsDisabled = document.cookie.indexOf('_fn_lc_tour') != -1 && this.getCookie('_fn_lc_tour') === 'false';
		if(this.tourCookieIsPresentAndTruthy) {
			this.showTourIntroModal = false;
			this.runNow = true;
			this.setupTour();
		} else if(!this.tourIsDisabled) {
			this.showTourIntroModal = true;
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
		this.setCookie('_fn_lc_tour_steps_seen', '', 365);
		this.currentSteps = this.stepsToShow;
	}

	@action disableTour() {
		this.stopTour();
		this.setCookie('_fn_lc_tour', false);
		this.tourIsDisabled = true;
		this.runNow = false;
		this.tourAutoStart = false;
		this.showTourIntroModal = false;
	}

	@action enableTour() {
		this.setCookie('_fn_lc_tour', true);
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
			this.showTourIntroModal = false;
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

	getCookie(cname) {
		let name = cname + '=';
		let ca = document.cookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}

	@action setCookie(cname, cvalue, exdays) {
		let expiryDays = exdays || 365;
		let d = new Date();
		d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
		let expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	@action recordStepAsSeenInCookie(stepInfo) {
		if (stepInfo.action === 'next' || stepInfo.action === 'close' && stepInfo.type === 'step:after') {
			let stepsAlreadySeen = this.stepsSeen;
			let stepSelector = stepInfo.step.selector;
			if (stepsAlreadySeen.indexOf(stepSelector) === -1) {
				stepsAlreadySeen.push(stepSelector);
				this.setCookie('_fn_lc_tour_steps_seen', JSON.stringify(stepsAlreadySeen));
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
			case '/network-status':
				allStepsForThisPage = Beacons.NetworkStatus;
				break;
			default:
				allStepsForThisPage = [];
			}
		}
		let unseenSteps = allStepsForThisPage.filter(step => {
			return this.stepsSeen.indexOf(step.selector) < 0;
		});
		return unseenSteps;
	}

	@computed get stepsSeen() {
		let stepsSeen = this.getCookie('_fn_lc_tour_steps_seen');
		if (!stepsSeen || stepsSeen === '') {
			return [];
		} else {
			return JSON.parse(stepsSeen)
		}
	}

	@computed get tourCookieIsPresentAndTruthy() {
		return document.cookie.indexOf('_fn_lc_tour') != -1 && this.getCookie('_fn_lc_tour') === 'true';
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
	@observable showTourIntroModal = false;
	@observable runNow = false;
	@observable stepIndex = 0;
	@observable selector = '';

	nextStepRenderAttempts = 0;
	nextStepMaxRenderAttempts = 10;
}

export const joyrideStore = new JoyrideStore();
