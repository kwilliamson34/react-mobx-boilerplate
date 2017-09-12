import {action, observable} from 'mobx';
import {walkthruSteps} from '../../content/walkthru-steps.json';

class JoyrideStore {

	@action initJoyride(joyrideRef) {
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

	@action joyrideStart() {
		this.joyride.start();
	}

	@action toggleWalkthru() {
		if(this.showWalkthru){
			this.disableWalkthru();
		}else{
			this.enableWalkthru();
		}
	}

	@action disableWalkthru() {
		this.showWalkthru = false;
		this.isReady = false;
		this.isRunning = false;
		this.setWalkthruCookie('FNWalkthru', false, 365);
	}

	@action enableWalkthru(){
		this.showWalkthru = true;
		this.isReady = true;
		this.isRunning = true;
		this.setWalkthruCookie('FNWalkthru', true, 365);
	}

	@action setWalkthruCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = 'expires='+d.toUTCString();
		document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
	}

	@action getWalkthruCookie(cname) {
		var name = cname + '=';
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
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

	@action checkWalkthruCookie() {
		var walkthruIsEnabled = this.getWalkthruCookie('FNWalkthru');
		console.log('xx: '  + walkthruIsEnabled);
		if (walkthruIsEnabled != '') {
			return walkthruIsEnabled;
		} else {
			//default to true
			this.setWalkthruCookie('FNWalkthru', true, 365);
			return true;
		}
	}

  joyride = {};
	@observable showWalkthru = false;
	@observable joyrideOverlay = true;
	@observable joyrideType = 'continuous';
	@observable isReady = false;
	@observable isRunning = false;
	@observable steps = walkthruSteps;
	@observable stepIndex = 0;
	@observable selector = '';
}

export const joyrideStore = new JoyrideStore();
