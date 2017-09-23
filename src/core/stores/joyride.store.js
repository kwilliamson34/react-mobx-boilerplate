import { action, observable, computed } from 'mobx';
import { Beacons } from '../../content/tour-steps.json';
import $ from 'jquery';

class JoyrideStore {

	@action toggleTour() {
		if (this.runNow) {
			this.disableTour();
		} else {
			this.resetStepsSeen();
			this.tourAutoStart = true;
			this.startTour();
		}
	}

	@action resetStepsSeen() {
		this.setCookie('_fn_lc_tour_steps_seen', '', 365);
	}

	@action disableTour() {
		this.setCookie('_fn_lc_tour', false);
		this.runNow = false;
		this.showTourIntroModal = false;
	}

	@action startTour() {
		if(!this.nextStepAnchorHasRendered) {
			//Required anchor(s) have not been rendered yet. Wait to start the tour.
			setTimeout(() => {
				this.startTour();
			}, 500);
		}

		this.showTourIntroModal = false;
		this.setCookie('_fn_lc_tour', true, 365);
		this.tourAutoStart = true;
		this.runNow = true;
		if(this.tourRef.start) {
			this.tourRef.start(true, this.stepsToShow, 0);
		}
	}

	@action pauseTour() {
		this.runNow = false;
	}

	@action unpauseTour() {
		this.runNow = true;
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
		if(document.cookie.indexOf('_fn_lc_tour') != -1) {
			this.showTourIntroModal = false;
			if(this.tourCookieValue()){
				this.startTour();
			}
		}else{
			this.showTourIntroModal = true;
		}
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

	@action updateSteps({pathname, runImmediately}) {
		if (pathname != this.tourPage) {
			this.tourPage = pathname;

			if(runImmediately && this.tourAutoStart) {
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

	tourCookieValue() {
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
