import React from 'react';
import PropTypes from 'prop-types';
import config from 'config';
import {observer,inject} from 'mobx-react';
import {Link} from 'react-router-dom';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

@inject('store')
@observer
export default class DevicesLandingPage extends React.Component {

	static propTypes = {
		store: PropTypes.object
  }

	constructor(props) {
		super(props);
		this.externalLinkStore = this.props.store.externalLinkStore;
	}

	componentWillMount() {
		this.externalLinkStore.getMarketingPortalDevices();
	}

	renderDeviceSection(sectionId, sectionTitle, sectionArray) {
		return (
			<section className={'view-' + sectionId}>
				<div className="container">
					<div className="row">
						<div className="col-xs-offset-2 col-xs-8 col-sm-offset-1 col-sm-10 col-md-offset-1 col-md-10">
							<h2>{sectionTitle}</h2>
							<ul className="mp-content">
								{sectionArray.map((item, idx) => {
									return (
										<li key={sectionId + '_' +idx}>
											<Link to={item.url} id={sectionId + '_' +idx}>
											{item.title}
											<div className="card-img-wrapper">
												<img src={config.mktgPortalImgBaseUrl + item.image} alt={item.title} />
											</div>
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
						<div className="row">
						<Link to={'/devices/' + sectionTitle.toLowerCase()} className="fn-primary showAll">Explore All {sectionTitle}</Link>
						</div>
					</div>
				</div>
			</section>
		)
	}

	render() {
		const crumbs = [
			{	pageHref: '/admin',
				pageTitle: 'Administration Dashboard'
			},
			{	pageHref: '/devices',
				pageTitle: 'Specialized Devices'
			}
		];
		return (
			<div className="devices-landing">
				<BreadcrumbNav links={crumbs} />
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-10 col-sm-offset-1 catalog-header">
							<h1 className="as-h2">Specialized Devices Catalog</h1>
							<h2 className="as-h3">FirstNet offers an extensive selection of devices and accessories</h2>
							<p>To learn more about our full portfolio, contact a FirstNet Specialist.</p>
						</div>
					</div>
				</div>
				{this.renderDeviceSection('phone', 'Phones', this.externalLinkStore.devicesData.phones)}
				{this.renderDeviceSection('tablet', 'Tablets', this.externalLinkStore.devicesData.tablets)}
				{this.renderDeviceSection('invehicle', 'In-Vehicle', this.externalLinkStore.devicesData.invehicle)}
				{this.renderDeviceSection('accessories', 'Accessories', this.externalLinkStore.devicesData.accessories)}
			</div>
		)
	}
}
