import {
	action,
	observable,
	isObservable,
} from 'mobx';

class JoyrideStore {

	@action initJoyride(joyrideRef) {
		console.log('joyrideRef', joyrideRef);
    // extendObservable(this.joyride, joyrideRef);
		// console.log('isObservable', isObservable(this.joyride));
		this.joyride = joyrideRef;
		console.log('this.joyRide', this.joyride);
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


  joyride = {};
	@observable joyrideOverlay = true;
	@observable joyrideType = 'continuous';
	@observable isReady = false;
	@observable isRunning = false;
	@observable steps = [{}];
	@observable stepIndex = 0;
	@observable selector = '';

}

export const joyrideStore = new JoyrideStore();
