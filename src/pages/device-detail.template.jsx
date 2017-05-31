import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
export default class DeviceDetailTemplate extends React.Component {
	constructor(props) {
		super(props);
		this.externalLinkStore = this.props.store.externalLinkStore;
	}

	componentWillMount() {
		this.externalLinkStore.getMarketingPortalDeviceDetail();
	}

	render() {
		return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 add-padding-bottom-dbl text-center">
            <h1 className="as-h2">Device Name</h1>
            <p>To learn more about our full portfolio, contact a FirstNet Specialist.</p>
          </div>
        </div>
      </div>
		)
	}
}


DeviceDetailTemplate.propTypes = {
	store: PropTypes.object
};
