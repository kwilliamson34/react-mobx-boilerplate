import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';

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
	}

	componentWillMount() {
		//User has navigated to a different category page so will make request for new category
		if(this.externalLinkStore.currentCategory != this.props.match.params.deviceCategory){
			this.externalLinkStore.resetDeviceCategoryData();
			this.externalLinkStore.currentDeviceCategory = this.props.match.params.deviceCategory;
			if (this.externalLinkStore.allSpecializedDevices.length) {
				this.externalLinkStore.fetchAndShowDeviceCategory();
			}
			else {
				this.externalLinkStore.fetchDevicesData()
				.then(() => this.externalLinkStore.fetchAndShowDeviceCategory());
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
			{	pageHref: this.props.match.url,
				pageTitle: this.externalLinkStore.currentCategory
			}
		];
		return (
			<section className="device-category">
				<BreadcrumbNav links={crumbs} />
				<div className="container">
					<div className="row">
						<div className="col-xs-12 catalog-header">
							<h1 className="as-h2">{this.externalLinkStore.currentCategory}</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-offset-2 col-xs-8 col-sm-12 col-sm-offset-0 col-md-offset-1 col-md-10">
							<ul className="mp-content left">
								{this.externalLinkStore.currentCategoryData.items.map((item, idx) => {
									let itemRoute = encodeURIComponent(item.device_title).replace(/%20/g, '+');
									return (
										<li key={idx}>
											<Link to={`/admin/devices/${item.device_category.toLowerCase()}/${itemRoute}`}>
												{item.device_title}
												<div className="card-img-wrapper">
													<img src={item.device_image_url} alt={item.device_image_alt} />
												</div>
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				</div>
			</section>
		)
	}
}
