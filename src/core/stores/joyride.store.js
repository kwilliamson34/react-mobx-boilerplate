import {action, observable} from 'mobx';
import {Beacons} from '../../content/tour-steps.json';

class JoyrideStore {

	@action initJoyride() {
		setTimeout(() => {
			this.isReady = true;
			this.isRunning = true;
			console.log('joyride ready: ' + this.isReady);
		}, 1000);
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
		if(this.showTour){
			this.disableTour();
		}else{
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

	@action startTour(){
		console.log('enableTour called');
		this.setCookie('_fn_tour', true, 365);
		this.isReady = true;
		this.isRunning = true;
		this.showTour = true;
		this.tourRef.reset();
	}

	/* Intro popup when cookie is not present */

	@action startTourIntro(){
		console.log('fn() startTourIntro');
		this.showTourIntroModal = true;
	}

	@action endTourIntro(){
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
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				console.log('gwc:' + typeof (c.substring(name.length, c.length) === 'true') + ' '  + c.substring(name.length, c.length));
				return (c.substring(name.length, c.length) === 'true');
			}
		}
		return '';
	}

	@action setCookie(cname, cvalue, exdays) {
		console.log('setCookie called');
		let expiryDays = exdays || 365;
		var d = new Date();
		d.setTime(d.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
		var expires = 'expires='+d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	@action checkTourCookie(joyrideRef) {
		console.log('checkTourCookie called');
		this.tourRef = joyrideRef;
		if(document.cookie.indexOf('_fn_tour') != -1){
			//cookie present - do what it says
			this.showTour =  this.getCookie('_fn_tour');
			if(this.showTour){
				this.startTour();
			}
		}else{
			//cookie doesnt exist.  set to true
			console.log('Cookie doesnt exist.  Show intro');
			this.startTourIntro();
		}
	}


  joyride = {};
	@observable tourRef = {};
	@observable showTourIntroModal = true;
	@observable showTour = true;
	@observable isReady = false;
	@observable isRunning = false;
	@observable steps = Beacons.LandingPage;
	@observable stepIndex = 0;
	@observable selector = '';
}

export const joyrideStore = new JoyrideStore();
