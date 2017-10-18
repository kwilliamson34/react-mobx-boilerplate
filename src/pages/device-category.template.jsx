import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import {Link} from 'react-router-dom';
import PageTitle from '../components/page-title/page-title';

import BreadcrumbNav from '../components/breadcrumb-nav/breadcrumb-nav';

@inject('store')
@observer
export default class DeviceCategoryTemplate extends React.Component {

	static propTypes = {
    match: PropTypes.object,
		store: PropTypes.object
  }

	constructor(props) {
		super(props);
		this.externalLinkStore = this.props.store.externalLinkStore;
		this.paginationCount = 0;
		this.devicesPerPagination = 20;
	}

	componentWillMount() {
		//Check that user has navigated to a different category before resetting pagination
		if (this.externalLinkStore.currentCategory != this.props.match.params.deviceCategory) {
			this.externalLinkStore.setCurrentDeviceCategory(this.props.match.params.deviceCategory);
			this.loadDevices();
		}
	}

	@observable devicesToLoad = [];

	loadDevices = () => {
		let endingIndex = (this.paginationCount * this.devicesPerPagination) + this.devicesPerPagination;
		this.devicesToLoad = this.externalLinkStore.filteredDeviceCategoryData.slice(0, endingIndex);
		this.paginationCount++;
	}

	showLoadMoreButton = () => {
		return this.devicesToLoad.length < this.externalLinkStore.filteredDeviceCategoryData.length;
	}

	loadMoreButton = () => {
		return (
			<button className='btn fn-secondary' onClick={this.loadDevices}>
				Load More
			</button>
		)
	}

	render() {
		const crumbs = [
			{	pageHref: '/admin',
				pageTitle: 'Administration Dashboard'
			},
			{	pageHref: '/admin/devices',
				pageTitle: 'Specialized Devices'
			},
			{	pageHref: this.props.match.url,
				pageTitle: this.externalLinkStore.currentDeviceCategory
			}
		];
		return (
			<section className="device-category">
				<BreadcrumbNav links={crumbs} />
				<div className="container">
					<div className="row">
						<div className="col-xs-12 catalog-header">
							<PageTitle>{this.externalLinkStore.currentDeviceCategory}</PageTitle>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-offset-2 col-xs-8 col-sm-12 col-sm-offset-0 col-md-offset-1 col-md-10">
							<ul className="mp-content left">
								{this.externalLinkStore.filteredDeviceCategoryData && this.devicesToLoad.map((device, idx) => {
									let devicePath = encodeURIComponent(device.device_title);
									return (
										<li key={idx}>
											<Link to={`/admin/devices/${device.device_category.toLowerCase()}/${devicePath}`}>
												<h3 dangerouslySetInnerHTML={{__html: device.device_title}} />
												<div className="card-img-wrapper">
													<img src={device.device_image_url} alt={device.device_image_alt} />
												</div>
											</Link>
										</li>
									)})}
							</ul>
						</div>
					</div>
					<div className="row">
						{this.showLoadMoreButton() && this.loadMoreButton()}
					</div>
				</div>
			</section>
		)
	}
}
