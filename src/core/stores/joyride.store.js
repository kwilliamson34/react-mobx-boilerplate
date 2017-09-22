import { action, observable } from 'mobx';
import { Beacons } from '../../content/tour-steps.json';

class JoyrideStore {

	@action initJoyride() {
		setTimeout(() => {
			this.isReady = true;
			this.isRunning = true;
		}, 1000);
	}

	@action isTourIncomplete() {
		let totalStepCount = 0;
		for (let page in Beacons) {
			totalStepCount += Beacons[page].length;
		}
		return this.stepsSeen.length < totalStepCount;
	}

	@action toggleTour() {
		if (this.showTour) {
			this.disableTour();
		} else {
			this.resetStepsSeen();
			this.startTour();
		}
	}

	@action disableTour() {
		this.showTour = false;
		this.isReady = false;
		this.isRunning = false;
		this.setCookie('_fn_lc_tour', false, 365);
		this.endTourIntro();
	}

	@action startTour() {
		this.setCookie('_fn_lc_tour', true, 365);
		this.isReady = true;
		this.isRunning = true;
		this.showTour = true;
		this.resetTour();
	}

	resetTour() {
		if(this.tourRef.start) {
			this.tourRef.start(true, this.steps, 0);
		}
	}

	@action disableAutoStart() {
		this.tourAutoStart = false;
	}

	@action enableAutoStart(){
		this.tourAutoStart = true;
	}

	/* Intro popup when cookie is not present */

	@action startTourIntro() {
		this.showTourIntroModal = true;
	}

	@action endTourIntro() {
		this.showTourIntroModal = false;
	}

	@action toggleIntroModal() {
		this.showTourIntroModal = !this.showTourIntroModal;
	}

	getCookie(cname) {
		var name = cname + '=';
		var ca = document.cookie.split(';');
		for(let i = 0; i < ca.length; i++) {
			var c = ca[i];
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
		var d = new Date();
		d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
		var expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	@action checkTourCookie(joyrideRef, pagePathname) {
		let tourPath = pagePathname || '';
		this.updateSteps(tourPath);
		this.tourRef = joyrideRef;
		if (document.cookie.indexOf('_fn_lc_tour') != -1) {
			//cookie present - do what it says
			this.showTour = (this.getCookie('_fn_lc_tour') === 'true');
			if (this.showTour) {
				this.startTour();
			}
		} else {
			//cookie doesnt exist.  set to true
			this.startTourIntro();
		}
	}

	@action recordStepAsSeenInCookie(stepInfo) {
		if (stepInfo.action === 'next' || stepInfo.action === 'close' && stepInfo.type === 'step:after') {
			let stepsAlreadySeen = this.stepsSeen;
			let stepSelector = stepInfo.step.selector;
			if (stepsAlreadySeen.indexOf(stepSelector) === -1) {
				stepsAlreadySeen.push(stepSelector);
				this.setCookie('_fn_lc_tour_steps_seen', JSON.stringify(stepsAlreadySeen), 365);
			}
		}
	}

	@action updatePlacement() {
		this.tourRef.calcPlacement();
	}

	@action updateSteps(pathname) {
		if (pathname != this.tourPage) {
			this.steps = this.hideStepsAlreadySeen(this.stepsToShow(pathname));
			this.tourPage = pathname;
			this.resetTour();
		}
	}

	stepsToShow(pathname) {
		// let path = location.pathname.match(/(\/([\w\d]*-?[\w\d]*)?)/gi)[0];
		let stepsToShow;
		if (pathname.includes('/app')) {
			stepsToShow = Beacons.AppDetail;
		} else {
			switch (pathname) {
			case '/admin':
				stepsToShow = Beacons.AdminDashboard;
				break;
			case '/admin/manage-apps':
				stepsToShow = Beacons.ManageApps;
				break;
			case '/network-status':
				stepsToShow = Beacons.NetworkStatus;
				break;
			default:
				stepsToShow = [];
			}
		}
		return stepsToShow
	}

	hideStepsAlreadySeen(stepsToShow) {
		let stepsAlreadySeen = this.stepsSeen;
		let stepsToActuallyShow = stepsToShow.filter(step => {
			return stepsAlreadySeen.indexOf(step.selector) < 0;
		});
		return stepsToActuallyShow;
	}


	get stepsSeen() {
		let stepsSeen = this.getCookie('_fn_lc_tour_steps_seen');
		if (!stepsSeen || stepsSeen === '') {
			return [];
		} else {
			return JSON.parse(stepsSeen)
		}
	}

	@action resetStepsSeen() {
		this.setCookie('_fn_lc_tour_steps_seen', '', 365);
		this.steps = this.stepsToShow(this.tourPage);
	}

	@observable tourPage = '';
	@observable tourRef = {};
	@observable tourAutoStart = true;
	@observable showTourIntroModal = false;
	@observable showTour = true;
	@observable isReady = false;
	@observable isRunning = false;
	@observable steps = Beacons.AdminDashboard;
	@observable stepIndex = 0;
	@observable selector = '';
}

export const joyrideStore = new JoyrideStore();
