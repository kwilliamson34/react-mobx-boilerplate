import React from 'react';
import PropTypes from 'prop-types';
import {observer,inject} from 'mobx-react';
import {Link} from 'react-router-dom';
import PageTitle from '../components/page-title/page-title';
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
		if (!this.externalLinkStore.allSpecializedDevices.length) {
			this.externalLinkStore.getDevicesData();
		}
	}

	renderDeviceSection(sectionId, sectionTitle, sectionArray) {
		const devicesPerRow = 4;
		return (
			<section className={'view-' + sectionId}>
				<div className="container">
					<div className="row">
						<div className="col-xs-offset-2 col-xs-8 col-sm-offset-0 col-sm-12 col-md-offset-1 col-md-10">
							<h2>{sectionTitle}</h2>
							<ul className="mp-content">
								{sectionArray.map((item, idx) => {
									if (idx >= devicesPerRow) return;
									let itemRoute = encodeURIComponent(item.device_title);
									return (
										<li key={sectionId + '_' +idx}>
											<Link to={`/admin/devices/${sectionTitle.toLowerCase()}/${itemRoute}`} id={sectionId + '_' +idx}>
												<h3 dangerouslySetInnerHTML={{__html: item.device_title}}/>
												<figure className="card-img-wrapper">
													<img src={item.device_image_url} alt="" />
													<figcaption className="sr-only">{item.device_image_alt}</figcaption>
												</figure>
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
						{sectionArray.length > devicesPerRow &&
							<div className="row">
								<Link to={'/admin/devices/' + sectionTitle.toLowerCase()} className="fn-primary showAll">Explore All {sectionTitle}</Link>
							</div>
						}
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
			{	pageHref: '/admin/devices',
				pageTitle: 'Specialized Devices'
			}
		];
		return (
			<div className="devices-landing">
				<BreadcrumbNav links={crumbs} />
				<div className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-10 col-sm-offset-1 catalog-header">
							<PageTitle>Specialized Devices</PageTitle>
							<p>
								FirstNet offers an extensive selection of devices and accessories. Check out a small selection of our portfolio. To learn more about our full portfolio, contact a FirstNet Specialist.
							</p>
						</div>
					</div>
				</div>
				{this.renderDeviceSection('phone', 'Phones', this.externalLinkStore.categorizedDeviceData.phones)}
				{this.renderDeviceSection('tablet', 'Tablets', this.externalLinkStore.categorizedDeviceData.tablets)}
				{this.renderDeviceSection('invehicle', 'In-Vehicle', this.externalLinkStore.categorizedDeviceData.invehicle)}
				{this.renderDeviceSection('accessories', 'Accessories', this.externalLinkStore.categorizedDeviceData.accessories)}
			</div>
		)
	}
}
