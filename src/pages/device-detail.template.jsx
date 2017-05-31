import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

@inject('store')
@observer
export default class DeviceDetailTemplate extends React.Component {

	static propTypes = {
    match: PropTypes.object
  }

	constructor(props) {
		super(props);
		this.externalLinkStore = this.props.store.externalLinkStore;
	}

	componentWillMount() {
		//is it the same?
		this.externalLinkStore.getDeviceDetail(this.props.match.url);
	}


	render() {
		return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-sm-10 col-sm-offset-1 add-padding-bottom-dbl text-center">
            <h1 className="as-h2">{this.externalLinkStore.currentDeviceDetail.deviceName}</h1>
						{JSON.stringify(this.externalLinkStore.currentDeviceDetail)}
          </div>
        </div>
      </div>
		)
	}
}


DeviceDetailTemplate.propTypes = {
	store: PropTypes.object
};
