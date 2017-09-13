import {action, observable} from 'mobx';
import {walkthruSteps} from '../../content/walkthru-steps.json';

class JoyrideStore {

	@action initJoyride(joyrideRef) {
		console.log('initJoyride called');
		this.joyride = joyrideRef;
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

	@action toggleWalkthru() {
		if(this.showWalkthru){
			this.disableWalkthru();
		}else{
			this.enableWalkthru();
		}
	}

	@action disableWalkthru() {
		console.log('disableWalkthru called');
		this.showWalkthru = false;
		this.showWalkthruIntroModal = false;
		this.isReady = false;
		this.isRunning = false;
		this.setWalkthruCookie('_fn_walkthru', false, 365);
	}

	enableWalkthru(){
		console.log('enableWalkthru called');
		this.showWalkthru = true;
		this.isReady = true;
		this.isRunning = true;
		this.setWalkthruCookie('_fn_walkthru', true, 365);
	}

	getWalkthruCookie(cname) {
		console.log('getWalkthruCookie called');
		var name = cname + '=';
		var ca = document.cookie.split(';');
		console.log('ca:' + ca);
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				console.log('gwc:' + c.substring(name.length, c.length) );
				return c.substring(name.length, c.length);
			}
		}
		return '';
	}

	setWalkthruCookie(cname, cvalue, exdays) {
		console.log('setWalkthruCookie called');
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = 'expires='+d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	checkWalkthruCookie() {
		console.log('checkWalkthruCookie called');
		var walkthruIsEnabled = this.getWalkthruCookie('_fn_walkthru');
		console.log('xx: '  + walkthruIsEnabled);
		if (walkthruIsEnabled != '') {
			console.log('ddd');
			return walkthruIsEnabled;
		} else {
			//default to true
			console.log('_fn_walkthru doesnt exist');
			this.setWalkthruCookie('_fn_walkthru', this.showWalkthru, 365);
			return true;
		}
	}

	@action toggleIntroModal() {
		this.showWalkthruIntroModal = !this.showWalkthruIntroModal;
	}


  joyride = {};
	@observable showWalkthruIntroModal = true;
	@observable showWalkthru = true;
	@observable isReady = false;
	@observable isRunning = false;
	@observable steps = walkthruSteps;
	@observable stepIndex = 0;
	@observable selector = '';
}

export const joyrideStore = new JoyrideStore();
