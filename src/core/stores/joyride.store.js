import {
	action,
	observable
} from 'mobx';

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

		this.steps = this.steps.concat(this.joyride.parseSteps(steps));
	}

	@action addJoyrideTooltip(data) {
		this.joyride.addTooltip(data);
	}

  @observable joyride = {};
	@observable joyrideOverlay = true;
	@observable joyrideType = 'continuous';
	@observable isReady = false;
	@observable isRunning = false;
	@observable steps = [{}];
	@observable stepIndex = 0;
	@observable selector = '';

}

export const joyrideStore = new JoyrideStore();
