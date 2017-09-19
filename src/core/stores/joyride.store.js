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
		for ( let page in Beacons ) {
			totalStepCount += Beacons[page].length;
		}
		console.log("isTourIncomplete", totalStepCount, this.stepsSeen.length)
		if ( totalStepCount !== this.stepsSeen.length ) {
			// there are things we haven't seen yet, show the tour.
			console.log("render the tour, it's incomplete")
			return true;
		} else {
			console.log("don't render the tour, we're good")
			// We've seen everything, don't render anything
			return false;
		}
	}

	@action addJoyrideSteps(steps) {
		if (!Array.isArray(steps)) {
			steps = [steps];
		}
		if (!steps.length) {
			return false;
		}
		this.steps = this.steps.concat(steps);
	}

	@action addJoyrideTooltip(data) {
		this.joyride.addTooltip(data);
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
		this.setCookie('_fn_tour', false, 365);
	}

	@action startTour() {
		console.log('enableTour called');
		this.setCookie('_fn_tour', true, 365);
		this.isReady = true;
		this.isRunning = true;
		this.showTour = true;
		this.tourRef.reset();
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
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				console.log('gwc:' + typeof (c.substring(name.length, c.length) === 'true') + ' ' + c.substring(name.length, c.length));
				console.log("-----------------------", c.substring(name.length, c.length), "-----------------------")
				return c.substring(name.length, c.length);
				// return (c.substring(name.length, c.length) === 'true');
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
		if (document.cookie.indexOf('_fn_tour') != -1) {
			//cookie present - do what it says
			this.showTour = this.getCookie('_fn_tour');
			if (this.showTour === 'true') {
				this.startTour();
			}
		} else {
			//cookie doesnt exist.  set to true
			console.log('Cookie doesnt exist.  Show intro');
			this.startTourIntro();
		}
	}

	@action handleStepChange(stepInfo) {
		if (stepInfo.type === 'step:after') {
			let stepsAlreadySeen = this.stepsSeen;
			let stepSelector = stepInfo.step.selector;
			console.log("before", stepsAlreadySeen)
			stepsAlreadySeen.push(stepSelector);
			console.log("after", stepsAlreadySeen);
			this.setCookie('_fn_tour_steps_seen', JSON.stringify(stepsAlreadySeen), 365);
		}
	}

	@action updateSteps(pathname) {
		if (pathname != this.tourPage) {
			let allStepsToShow;
			switch (pathname) {
				case '/admin/manage-apps':
					allStepsToShow = Beacons.ManageApps;
					break;
				case '/admin':
					allStepsToShow = Beacons.AdminDashboard;
					break;
				case '/admin/network-status':
					allStepsToShow = Beacons.NetworkStatus;
					break;
				case '/app/':
					allStepsToShow = Beacons.AppDetails;
					break;
				default:
					allStepsToShow = [];
			}
			this.steps = this.hideStepsAlreadySeen(allStepsToShow);
			this.tourPage = pathname;
			if (this.tourRef.start) {
				this.tourRef.start(true, this.steps, 0);
			}
		}
	}

	hideStepsAlreadySeen(stepsToShow) {
		let stepsAlreadySeen = this.stepsSeen;
		let stepsToActuallyShow = [];
		for (let step in stepsToShow) {
			console.log("checking step:", step), stepsToShow[step].selector, stepsAlreadySeen.indexOf(stepsToShow[step].selector);
			if (stepsAlreadySeen.indexOf(stepsToShow[step].selector) === -1) {
				stepsToActuallyShow.push(stepsToShow[step]);
			}
		}
		return stepsToActuallyShow;
	}

	get stepsSeen() {
		let stepsSeen = this.getCookie('_fn_tour_steps_seen');
		console.log("steps ", stepsSeen);
		if (stepsSeen === '') {
			return [];
		} else {
			return JSON.parse(stepsSeen)
		}
	}

	@action resetStepsSeen() {
		this.setCookie('_fn_tour_steps_seen', '', 365);		
	}

	joyride = {};
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
