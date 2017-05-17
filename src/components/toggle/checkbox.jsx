import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

export default class Checkbox extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		value: PropTypes.string,
		label: PropTypes.string.isRequired,
		onClick: PropTypes.func,
		defaultOn: PropTypes.bool,
		disabled: PropTypes.bool
	}

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick(event) {
		if (this.props.disabled) {
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

	render() {
		const inputIdentifier = this.props.id + '-checkbox';
		return (
			<div className={`checkbox ${this.props.disabled ? 'disabled' : ''}`}>
				<label>
					<input
						type="checkbox"
						id={inputIdentifier}
						ref={ref => this.input = ref}
						aria-disabled={this.props.disabled}
						className={`${this.props.disabled ? 'disabled' : ''}`}
						value={this.props.value || this.props.label}
						defaultChecked={this.props.defaultOn}
						onClick={this.onClick}/>
					<span className="cr"></span>
					<span className="layer-label">{this.props.label}</span>
				</label>
			</div>
		)
	}
}
