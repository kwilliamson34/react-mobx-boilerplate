import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { observer } from 'mobx-react';

@observer
export default class Modal extends React.Component {

	static propTypes = {
		id: PropTypes.string,
		value: PropTypes.string,
		label: PropTypes.string,
		onClick: PropTypes.func,
		children: PropTypes.array,
		show: PropTypes.bool
	}

	constructor(props) {
		super(props);
		this.handleFocusEnter = this.handleFocusEnter.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		if (this.props.show) {
			event.preventDefault();
		} else {
			if (this.props.onClick) {
				this.props.onClick(event);
			}
		}
	}

	doClick() {
		this.input.click();
	}

	handleFocusEnter(event) {
		if (event.key === 'Enter') {
			$(event.target.parentElement).find('input').click();
		}
	}

	render() {

		return (
			<div>
				<div id="exitModal" className={`modal fade ${this.props.show ? 'in' : ''}`} ref="modal">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="row no-gutters">
								{this.props.children}
							</div>
						</div>
					</div>
				</div>
				<div className={`modal-backdrop fade ${this.props.show ? 'in' : ''}`} ></div>
			</div>

		)
	}
}

