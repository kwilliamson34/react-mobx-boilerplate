import React from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends React.Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		value: PropTypes.string,
		label: PropTypes.string.isRequired,
		onChange: PropTypes.func,
		defaultOn: PropTypes.bool,
		disabled: PropTypes.bool
	}

	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(event) {
		if (this.props.disabled) {
			event.preventDefault();
		} else {
			if (this.props.onChange) {
				this.props.onChange(event);
			}
		}
	}

	turnOn() {
		this.input.checked = true;
	}

	turnOff() {
		this.input.checked = false;
	}

	render() {
		return (
			<div className={`checkbox ${this.props.disabled ? 'disabled' : ''}`}>
				<label>
					<input
						type="checkbox"
						id={this.props.id}
						ref={ref => this.input = ref}
						aria-disabled={this.props.disabled}
						className={`${this.props.disabled ? 'disabled' : ''}`}
						value={this.props.value || this.props.label}
						defaultChecked={this.props.defaultOn}
						onChange={this.onChange}/>
					<span className="cr"></span>
					<span className="layer-label">{this.props.label}</span>
				</label>
			</div>
		)
	}
}
