import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';
import PurchasingInfo from '../components/purchasing-info/purchasing-info';

@inject('store')
@observer
export default class DeviceDetailTemplate extends React.Component {

	static propTypes = {
    match: PropTypes.object,
		store: PropTypes.object
  }

	constructor(props) {
		super(props);
		this.externalLinkStore = this.props.store.externalLinkStore;
	}

	componentWillMount() {
		//checking if the user was on this page previously, eliminating need for new request
		if(this.props.match.params.deviceId != this.externalLinkStore.currentDeviceDetail.path){
			this.externalLinkStore.resetDeviceDetail();
			if (this.externalLinkStore.allSpecializedDevices.length) {
				this.externalLinkStore.fetchAndShowDeviceDetails(this.props.match.params.deviceId);
			} else {
				this.externalLinkStore.getDevicesData().then(() => {
					this.externalLinkStore.fetchAndShowDeviceDetails(this.props.match.params.deviceId)
				});
			}
		}
	}

	render() {
		const crumbs = [
			{	pageHref: '/admin',
				pageTitle: 'Administration Dashboard'
			},
			{	pageHref: '/admin/devices',
				pageTitle: 'Specialized Devices'
			},
			{	pageHref: '/admin/devices/' + this.props.match.params.deviceCategory,
				pageTitle: this.props.match.params.deviceCategory
			},
			{	pageHref: this.props.match.url,
				pageTitle: this.externalLinkStore.currentDeviceDetail.deviceName
			}
		];
		return (
			<section className="device-detail">
				<BreadcrumbNav links={crumbs} />
				<div className="container detail-block">
					<div className="row">
					<div className="col-xs-10 col-xs-offset-1 text-center visible-xs-block"><h1>{this.externalLinkStore.currentDeviceDetail.deviceName}</h1></div>
					</div>
					<div className="row is-flex">
						<div className="
							col-xs-offset-2 col-xs-8
							col-sm-offset-1 col-sm-5
							col-md-offset-0 col-md-4
							col-lg-offset-1 col-lg-3">
							<img
								className="img-responsive"
								src={this.externalLinkStore.currentDeviceDetail.deviceImg}
								alt={this.externalLinkStore.currentDeviceDetail.deviceImgAlt} />
						</div>
						<div className="
							col-xs-offset-1 col-xs-10
							col-sm-offset-0 col-sm-6
							col-md-offset-0 col-md-7
							col-lg-offset-0 col-lg-8">
							<h1 className="hidden-xs"><span dangerouslySetInnerHTML={{__html: this.externalLinkStore.currentDeviceDetail.deviceName}} /></h1>
							<div className="feature-list" dangerouslySetInnerHTML={{__html: this.externalLinkStore.currentDeviceDetail.features}}></div>
						</div>
						<div className="
							col-xs-offset-1 col-xs-10
							col-lg-offset-4 col-lg-7">
							{this.externalLinkStore.currentPurchasingInfo && this.externalLinkStore.showPurchasingInfo &&
								<PurchasingInfo contactInfo={this.externalLinkStore.currentPurchasingInfo} />
							}
						</div>
					</div>
				</div>
				{(this.externalLinkStore.currentDeviceDetail.terms) &&
					<div className="terms-block">
						<div className="container">
							<div className="row">
								<div className="col-xs-10 col-xs-offset-1 col-sm-offset-1 col-sm-10">
									<div dangerouslySetInnerHTML={{ __html: this.externalLinkStore.currentDeviceDetail.terms}}></div>
								</div>
							</div>
						</div>
					</div>
				}
			</section>
		)
	}
}
