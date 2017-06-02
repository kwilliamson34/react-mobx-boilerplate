import React from 'react';
import PropTypes from 'prop-types';
// import $ from 'jquery';
import { observer } from 'mobx-react';

@observer
export default class Modal extends React.Component {

	static propTypes = {
		store: PropTypes.object,
		history: PropTypes.object
		// id: PropTypes.string,
		// value: PropTypes.string,
		// label: PropTypes.string,
		// onClick: PropTypes.func
	}

	constructor(props) {
		super(props);
		this.store = this.props.store;
		this.history = this.props.history;

		// this.handleFocusEnter = this.handleFocusEnter.bind(this);
		// this.onClick = this.onClick.bind(this);
	}

	toggleExitModal = () => {
		// event.preventDefault();
		this.store.toggleExitModal()
	}

	discardFormChanges = () => {
		// event.preventDefault();
		this.store.discardFormChanges()
	}

	// onClick(event) {
	// 	if (this.props.show) {
	// 		event.preventDefault();
	// 	} else {
	// 		if (this.props.onClick) {
	// 			this.props.onClick(event);
	// 		}
	// 	}
	// }

	// doClick() {
	// 	this.input.click();
	// }

	// handleFocusEnter(event) {
	// 	if (event.key === 'Enter') {
	// 		$(event.target.parentElement).find('input').click();
	// 	}
	// }

	render() {

		console.log(this.store.showExitModal)

		return (
			<div>
				<div id="exitModal" className="modal fade in" ref="exit modal">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="row no-gutters">
								<div className="col-xs-12">
									<h4 className="as-h2">Unsaved changes</h4>
									<p>Your form changes will not be saved if you navigate away from this page.</p>
								</div>
								<div className="col-xs-12 text-center">
									<button className='fn-primary' onClick={this.toggleExitModal()}>Stay on Page</button>
									<button className='fn-secondary' onClick={this.discardFormChanges()}>Discard Changes</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="modal-backdrop fade in" ></div>
			</div>

		)
	}
}

