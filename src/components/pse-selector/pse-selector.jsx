import React from 'react';
import PropTypes from 'prop-types';

import {observer,inject} from 'mobx-react';


@inject('store')
@observer
export default class PSESelector extends React.Component {
	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
	}

	componentWillMount() {
		this.headerStore.getLastPSE();
	}

	handleSelect = (event) => {
		event.preventDefault();
		this.headerStore.updatePSE(event.currentTarget.getAttribute('data-value'));
	}

	render() {
		return (
			<div className="pse-selector-btn">
				{(this.headerStore.pse_list.length > 1)
				?<div className="dropdown btn-group">
					<button id="pse-selector" role="button" className="dropdown-toggle btn btn-default" data-toggle="dropdown">{this.headerStore.currentPSEName}</button>
					<ul role="menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="pse-selector">
						{this.headerStore.pse_list.map((pse_name, idx) => {
							return(
								<li role="presentation" key={idx}>
									<a href="#" tabIndex="-1" data-value={idx} onClick={this.handleSelect}>{pse_name}</a>
								</li>
							)
						})}
					</ul>
				</div>
				:<div id="pse-selector">
					<p>{this.headerStore.currentPSEName}</p>
				</div>
				}
			</div>
		)
	}
}
PSESelector.propTypes = {
	store: PropTypes.object
};
