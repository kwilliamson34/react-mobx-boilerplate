import { action, observable, computed } from 'mobx';
import { Beacons } from '../../content/tour-steps.json';

class JoyrideStore {

	@action initJoyride() {
		setTimeout(() => {
			this.runNow = false;
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

	@action resetStepsSeen() {
		this.setCookie('_fn_lc_tour_steps_seen', '', 365);
	}

	@action disableTour() {
		this.runNow = false;
		this.setCookie('_fn_lc_tour', false, 365);
		this.showTourIntroModal = false;
	}

	@action startTour() {
		//make sure all anchors exist first
		if(!this.nextStepAnchorHasRendered) {
			console.log('Required anchor(s) have not been rendered yet. Waiting to start the tour.');
			setTimeout(() => {
				this.startTour();
			}, 500);
		}

		this.setCookie('_fn_lc_tour', true, 365);
		this.tourAutoStart = true;
		this.runNow = true;

		if(this.tourRef.start) {
			this.tourRef.start(true, this.stepsToShow, 0);
		}
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
		let pathname = pagePathname || '';
		this.updateSteps({pathname, runImmediately: false});
		this.tourRef = joyrideRef;
		if (this.tourCookieIsPresent) {
			this.startTour();
		} else {
			this.showTourIntroModal = true;
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

	@action updateSteps({pathname, runImmediately}) {
		console.log('updating steps')
		if (pathname != this.tourPage) {
			console.log('mismatch detected');
			this.tourPage = pathname;

			if(runImmediately && this.tourAutoStart) {
				console.log('starting tour')
				this.startTour();
			}
		}
	}

	@computed get stepsToShow() {
		let allStepsForThisPage;
		if (this.tourPage.includes('/app/')) {
			allStepsForThisPage = Beacons.AppDetail;
		} else {
			switch (this.tourPage) {
			case '/admin':
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

		//hide steps already seen
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

	@computed get tourCookieIsPresent() {
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

	@observable tourPage = '';
	@observable tourRef = {};
	@observable tourAutoStart = true;
	@observable showTourIntroModal = false;
	@observable runNow = false;
	@observable stepIndex = 0;
	@observable selector = '';
}

export const joyrideStore = new JoyrideStore();
