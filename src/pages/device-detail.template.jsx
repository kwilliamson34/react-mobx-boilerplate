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
					this.externalLinkStore.fetchAndShowDeviceDetails(this.props.match.params.deviceId);
				});
			}
		}
	}


	render() {

		this.externalLinkStore.currentDeviceDetail.terms = "<ol><li>Available space is less and varies due to many factors. A standard configuration uses approximately 4GB to 6GB of space (including iOS and built-in apps) depending on the model and settings.<\/li>\n\t<li>Size and weight vary by configuration and manufacturing process.<\/li>\n\t<li>FaceTime calling requires a FaceTime-enabled device for the caller and recipient and a Wi-Fi connection. Availability over a cellular network depends on carrier policies; data charges may apply.<\/li>\n\t<li>Data plan required. LTE Advanced, LTE, and Wi-Fi calling are available in select markets and through select carriers. Speeds are based on theoretical throughput and vary based on site conditions and carrier. For details on LTE support, contact AT&amp;T and see <a href=\"https:\/\/www.apple.com\/iphone\/LTE\">www.apple.com\/iphone\/LTE<\/a>.<\/li>\n\t<li>Cellular data plan is sold separately. Cellular data service is available only on Wi-Fi + Cellular models. The model you purchase is configured to work with a particular cellular network technology. Check with AT&amp;T for compatibility and cellular data plan availability.<\/li>\n\t<li>Embedded Apple SIM in iPad Pro (9.7-inch) may be disabled when purchased from some carriers. See AT&amp;T for details. Apple SIM and embedded Apple SIM not available in China.<\/li>\n\t<li>Battery life varies by use and configuration. See <a href=\"https:\/\/www.apple.com\/batteries\">www.apple.com\/batteries<\/a> for more information.<\/li>\n<\/ol><p>TM and \u00a9 2017 Apple Inc. All rights reserved.<\/p>"

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
					<div className="col-xs-10 col-xs-offset-1 text-center visible-xs-block visible-sm-block"><h1 dangerouslySetInnerHTML={{__html: this.externalLinkStore.currentDeviceDetail.deviceName}} /></div>
					</div>
					<div className="row is-flex">
						<div className="
							col-xs-offset-0 col-xs-12
							col-sm-offset-0 col-sm-6
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
							<h1 className="hidden-xs hidden-sm"><span dangerouslySetInnerHTML={{__html: this.externalLinkStore.currentDeviceDetail.deviceName}} /></h1>
							<div className="feature-list" dangerouslySetInnerHTML={{__html: this.externalLinkStore.currentDeviceDetail.features}}></div>
						</div>
						<div className="
							col-xs-offset-0 col-xs-12
							col-md-offset-4 col-md-7
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
								<div className="
									col-xs-offset-0 col-xs-12
									col-lg-offset-1 col-lg-10">
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
