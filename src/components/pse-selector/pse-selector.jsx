import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';

import {observer,inject} from 'mobx-react';


@inject('store')
@observer
export default class PSESelector extends React.Component {
	constructor(props) {
		super(props);
		this.headerStore = this.props.store.headerStore;
	}

	updatePSE(val){
		this.headerStore.updatePSE(val);
	}

	render() {
		return (
			<div className="pse-selector-btn">
				{this.headerStore.pse_list.length > 1
				?
					<DropdownButton id="pse-selector" title={this.headerStore.currentPSE} onSelect={this.updatePSE.bind(this)} noCaret>
					{this.headerStore.pse_list.map((pse_name, idx) => {
						return <MenuItem eventKey={idx} key={idx}>{pse_name}</MenuItem>
					})}
					</DropdownButton>
				:
					<div id="pse-selector">
						<p>{this.headerStore.currentPSE}</p>
					</div>
				}
			</div>
		)
	}
}

PSESelector.propTypes = {};
