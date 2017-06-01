import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

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
		if(this.props.match.url != this.externalLinkStore.currentDeviceDetail.path){
			this.externalLinkStore.getDeviceDetail(this.props.match.url);
		}
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
								src={this.externalLinkStore.currentDeviceDetail.deviceImg} alt={this.externalLinkStore.currentDeviceDetail.deviceImgAlt} />
						</div>
						<div className="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-6 col-md-6 col-md-offset-0 col-lg-7">
							<h1 className="as-h2 hidden-xs">{this.externalLinkStore.currentDeviceDetail.deviceName}</h1>
							<ul className="feature-list">
								{this.externalLinkStore.currentDeviceDetail.features.map((feature, idx) => {
									return (
										<li key={idx}
											dangerouslySetInnerHTML={{ __html: feature}} />
									)
								})}
							</ul>
						</div>
					</div>
				</div>
				{(this.externalLinkStore.currentDeviceDetail.terms !== '') &&
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
