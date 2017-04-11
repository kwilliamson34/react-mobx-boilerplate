import { action, autorun, computed, observable, observer } from 'mobx';
import { apiService } from '../services/api.service';

class AppStore {


	// ACTIONS

	@action addName() {
		if (this.nameFieldStr.length < 1) {
			return;
		}
		this.names.push(this.nameFieldStr);
		this.nameFieldStr = '';
	}

	@action loadEmployee() {
		let success, failure;

		success = (res) => {
			this.employee = res.data;
		};

		failure = (err) => {
			console.log(err);
		};

		apiService.loadEmployee().then(success, failure);
	}

	@action nameFieldChange(value) {
		this.nameFieldStr = value;
	}

	@action removeName(idx) {
		this.names.splice(idx, 1);
	}


	//COMPUTEDS

	@computed get lastNameAdded() {
		return this.names[this.names.length - 1];
	}


	// OBSERVABLES

	@observable employee = {};

	@observable nameFieldPlaceholder = 'please enter a name...'

	@observable nameFieldStr = '';

	@observable names = [];
}

export const appStore = new AppStore();