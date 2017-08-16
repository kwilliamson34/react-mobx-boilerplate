import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import {Link} from 'react-router-dom';

import {utilsService} from '../core/services/utils.service';
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
		//User has navigated to a different category page so will make request for new category
		if (this.externalLinkStore.currentCategory != this.props.match.params.deviceCategory) {
			this.externalLinkStore.resetDeviceCategoryData();
			this.externalLinkStore.currentDeviceCategory = this.props.match.params.deviceCategory;
			if (this.externalLinkStore.allSpecializedDevices.length) {
				this.externalLinkStore.fetchAndShowDeviceCategory();
				this.loadDevices();
			} else {
				this.externalLinkStore.getDevicesData().then(() => {
					this.externalLinkStore.fetchAndShowDeviceCategory();
					this.loadDevices();
				});
			}
		} else {
			this.loadDevices();
		}
	}

	@observable devicesToLoad = [];

	loadDevices = () => {
		let endingIndex = (this.paginationCount * this.devicesPerPagination) + this.devicesPerPagination;
		this.devicesToLoad = this.externalLinkStore.currentDeviceCategoryData.items.slice(0, endingIndex);
		this.paginationCount++;
	}

	showLoadMoreButton = () => {
		return this.devicesToLoad.length < this.externalLinkStore.currentDeviceCategoryData.items.length;
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
							<h1>{this.externalLinkStore.currentDeviceCategory}</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-offset-2 col-xs-8 col-sm-12 col-sm-offset-0 col-md-offset-1 col-md-10">
							<ul className="mp-content left">
								{this.externalLinkStore.currentDeviceCategoryData.items && this.devicesToLoad.map((item, idx) => {
									let itemRoute = utilsService.getDevicesAndSolutionsUrl(item.device_title);
									return (
										<li key={idx}>
											<Link to={`/admin/devices/${item.device_category.toLowerCase()}/${itemRoute}`}>
												<h3 dangerouslySetInnerHTML={{__html: item.device_title}} />
												<div className="card-img-wrapper">
													<img src={item.device_image_url} alt={item.device_image_alt} />
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
