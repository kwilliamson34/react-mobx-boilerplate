import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';

import PageTitle from '../components/page-title/page-title';
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
    this.externalLinkStore.fetchMarketingPortalData();

    const deviceName = decodeURIComponent(this.props.match.params.deviceId);
    this.externalLinkStore.setCurrentDevice(deviceName);
  }

  componentWillUnmount() {
    this.externalLinkStore.resetDeviceDetail();
  }

  render() {
    const crumbs = [
      {
        pageHref: '/admin',
        pageTitle: 'Administration Dashboard'
      }, {
        pageHref: '/admin/devices',
        pageTitle: 'Specialized Devices'
      }, {
        pageHref: '/admin/devices/' + this.props.match.params.deviceCategory,
        pageTitle: this.props.match.params.deviceCategory
      }, {
        pageHref: this.props.match.url,
        pageTitle: this.externalLinkStore.currentDeviceDetail.deviceName
      }
    ];
    return (
      <section className="device-detail">
        <BreadcrumbNav links={crumbs}/>
        <div className="container detail-block">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1 text-center visible-xs-block visible-sm-block">
              <PageTitle>{this.externalLinkStore.currentDeviceDetail.deviceName}></PageTitle>
            </div>
          </div>
          <div className="row is-flex">
            <div className="
							col-xs-offset-0 col-xs-12
							col-sm-offset-0 col-sm-6
							col-md-offset-0 col-md-4
							col-lg-offset-1 col-lg-3">
              <img className="img-responsive" src={this.externalLinkStore.currentDeviceDetail.deviceImg} alt={this.externalLinkStore.currentDeviceDetail.deviceImgAlt}/>
            </div>
            <div className="
							col-xs-offset-1 col-xs-10
							col-sm-offset-0 col-sm-6
							col-md-offset-0 col-md-7
							col-lg-offset-0 col-lg-8">
              <PageTitle className="hidden-xs hidden-sm">
                {this.externalLinkStore.currentDeviceDetail.deviceName}
              </PageTitle>
              <div className="feature-list" dangerouslySetInnerHTML={{
                __html: this.externalLinkStore.currentDeviceDetail.features
              }}></div>
              <div className="hidden-xs hidden-sm contact-info">
                {this.externalLinkStore.currentDevicePurchasingInfo &&
									<PurchasingInfo contactInfo={this.externalLinkStore.currentDevicePurchasingInfo}/>}
              </div>
            </div>
            <div className="contact-info
							visible-xs-block visible-sm-block
							col-xs-offset-0 col-xs-12
							col-md-offset-4 col-md-7">
              {this.externalLinkStore.currentDevicePurchasingInfo &&
								<PurchasingInfo contactInfo={this.externalLinkStore.currentDevicePurchasingInfo}/>}
            </div>
          </div>
        </div>
        {(this.externalLinkStore.currentDeviceDetail.terms) && <div className="terms-block">
          <div className="container">
            <div className="row">
              <div className="
									col-xs-offset-0 col-xs-12
									col-lg-offset-1 col-lg-10">
                <div dangerouslySetInnerHTML={{
                  __html: this.externalLinkStore.currentDeviceDetail.terms
                }}></div>
              </div>
            </div>
          </div>
        </div>}
      </section>
		)
	}
}
