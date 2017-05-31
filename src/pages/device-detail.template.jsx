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
			<section className="device-detail">
				<div className="container detail-block">
					<div className="row is-flex">
						<div className="col-xs-10 col-xs-offset-1 col-sm-offset-1 col-sm-4 col-md-offset-1 col-md-4 col-lg-offset-1 col-lg-3 debug">
							<img
								className="img-responsive"
								src={this.externalLinkStore.currentDeviceDetail.deviceImg} alt={this.externalLinkStore.currentDeviceDetail.deviceImgAlt} />
						</div>
						<div className="col-xs-10 col-xs-offset-1 col-sm-offset-0 col-sm-6 col-md-6 col-md-offset-0 col-lg-7 debug">
							<h1 className="as-h2">{this.externalLinkStore.currentDeviceDetail.deviceName}</h1>
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
					<div className="terms-block debug">
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


DeviceDetailTemplate.propTypes = {
	store: PropTypes.object
};
