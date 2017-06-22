import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';
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
				this.externalLinkStore.getDeviceDetailData(this.props.match.params.deviceId);
			} else {
				this.externalLinkStore.fetchDevicesData()
				.then(() => this.externalLinkStore.getDeviceDetailData(this.props.match.params.deviceId));
			}
		}
	}

	showPurchasingInfo = (contactInfo) => {
		let showPurchasingInfo = true;
		if (Object.keys(contactInfo).every((p) => contactInfo[p] === '')) showPurchasingInfo = false;
		return showPurchasingInfo;
	}

	render() {
		const crumbs = [
			{	pageHref: '/admin',
				pageTitle: 'Administration Dashboard'
			},
			{	pageHref: '/devices',
				pageTitle: 'Specialized Devices'
			},
			{	pageHref: '/devices/' + this.props.match.params.deviceCategory,
				pageTitle: this.props.match.params.deviceCategory
			},
			{	pageHref: this.props.match.url,
				pageTitle: this.externalLinkStore.currentDeviceDetail.deviceName
			}
		];
		console.log('DEVICE   ', this.externalLinkStore.currentDeviceDetail);
		return (
			<section className="device-detail">
				<BreadcrumbNav links={crumbs} />
				<div className="container detail-block">
					<div className="row">
					<div className="col-xs-10 col-xs-offset-1 text-center visible-xs-block "><h1 className="as-h2">{this.externalLinkStore.currentDeviceDetail.deviceName}</h1></div>
					</div>
					<div className="row is-flex">
						<div className="col-xs-10 col-xs-offset-1 col-sm-offset-1 col-sm-4 col-md-offset-1 col-md-4 col-lg-offset-1 col-lg-3">
							<img
								className="img-responsive"
								src={this.externalLinkStore.currentDeviceDetail.deviceImg}
								alt={this.externalLinkStore.currentDeviceDetail.deviceImgAlt} />
						</div>
						<div className="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-6 col-md-6 col-md-offset-0 col-lg-7">
							<h1 className="as-h2 hidden-xs">{this.externalLinkStore.currentDeviceDetail.deviceName}</h1>
							<div className="feature-list" dangerouslySetInnerHTML={{__html: this.externalLinkStore.currentDeviceDetail.features}}></div>
						</div>
					</div>
					{this.externalLinkStore.currentDeviceDetail.contactInfo && this.showPurchasingInfo(this.externalLinkStore.currentDeviceDetail.contactInfo) &&
						<PurchasingInfo contactInfo={this.externalLinkStore.currentDeviceDetail.contactInfo} />
					}
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
