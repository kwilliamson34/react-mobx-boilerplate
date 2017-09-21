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
		console.log('disableTour called');
		this.showTour = false;
		this.isReady = false;
		this.isRunning = false;
		this.setCookie('_fn_lc_tour', false, 365);
		this.endTourIntro();
	}

	@action startTour() {
		console.log('enableTour called');
		this.setCookie('_fn_lc_tour', true, 365);
		this.isReady = true;
		this.isRunning = true;
		this.showTour = true;
		this.tourRef.reset(true);
	}

	/* Intro popup when cookie is not present */

	@action startTourIntro() {
		console.log('fn() startTourIntro');
		this.showTourIntroModal = true;
	}

	@action endTourIntro() {
		console.log('fn() endTourIntro');
		this.showTourIntroModal = false;
	}

	@action toggleIntroModal() {
		console.log('fn() toggleIntroModal');
		this.showTourIntroModal = !this.showTourIntroModal;
	}

	getCookie(cname) {
		console.log('getCookie called');
		var name = cname + '=';
		var ca = document.cookie.split(';');
		console.log('ca:' + ca);
		for(let i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				console.log('gwc:' + typeof (c.substring(name.length, c.length) === 'true') + ' ' + c.substring(name.length, c.length));
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}

	@action setCookie(cname, cvalue, exdays) {
		console.log('setCookie called');
		let expiryDays = exdays || 365;
		var d = new Date();
		d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
		var expires = 'expires=' + d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	@action checkTourCookie(joyrideRef, pagePathname) {
		console.log('checkTourCookie called: ' + pagePathname);
		let tourPath = pagePathname || '';
		console.log('tp: ' + tourPath);
		this.updateSteps(tourPath);
		this.tourRef = joyrideRef;
		if (document.cookie.indexOf('_fn_lc_tour') != -1) {
			//cookie present - do what it says
			this.showTour = this.getCookie('_fn_lc_tour');
			if (this.showTour === 'true') {
				this.startTour();
			}
		} else {
			//cookie doesnt exist.  set to true
			console.log('Cookie doesnt exist.  Show intro');
			this.startTourIntro();
		}
	}

	@action recordStepAsSeenInCookie(stepInfo) {
		if (stepInfo.action === 'next' && stepInfo.type === 'step:after') {
			let stepsAlreadySeen = this.stepsSeen;
			let stepSelector = stepInfo.step.selector;
			if (stepsAlreadySeen.indexOf(stepSelector) === -1) {
				stepsAlreadySeen.push(stepSelector);
				this.setCookie('_fn_lc_tour_steps_seen', JSON.stringify(stepsAlreadySeen), 365);
			}
		}
	}

@action updateSteps(pathname) {
		// let path = location.pathname.match(/(\/([\w\d]*-?[\w\d]*)?)/gi)[0];
		console.log('---regex path: ' + pathname);
		if (pathname != this.tourPage) {
			let allStepsToShow;
			if (pathname.includes('/app')) {
				allStepsToShow = Beacons.AppDetail;
			} else {
				switch (pathname) {
				case '/admin':
					allStepsToShow = Beacons.AdminDashboard;
					break;
				case '/admin/manage-apps':
					allStepsToShow = Beacons.ManageApps;
					break;
				case '/network-status':
					allStepsToShow = Beacons.NetworkStatus;
					break;
				default:
					allStepsToShow = [];
				}
			}
			this.steps = this.hideStepsAlreadySeen(allStepsToShow);
			this.tourPage = pathname;
			if (this.tourRef.reset) {
				this.tourRef.reset(true);
			}
		}
	}

	hideStepsAlreadySeen(allStepsToShow) {
		let stepsAlreadySeen = this.stepsSeen;
		let stepsToActuallyShow = allStepsToShow.filter(step => {
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
	}

	@observable tourPage = '';
	@observable tourRef = {};
	@observable showTourIntroModal = false;
	@observable showTour = true;
	@observable isReady = false;
	@observable isRunning = false;
	@observable steps = Beacons.AdminDashboard;
	@observable stepIndex = 0;
	@observable selector = '';
}

export const joyrideStore = new JoyrideStore();
