import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
//const cheerio = require('cheerio');

@inject('store')
@observer
export default class ShopDevicesPage extends React.Component {
    constructor(props) {
      super(props);
      this.mpStore = this.props.store.externalContentStore;
    }

    componentWillMount() {
      console.log('mounted: fetch devices now');
      this.mpStore.getMPDevices();
    }


    render() {
        return (

          <article id="shop-devices-page">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-sm-10 col-sm-offset-1 add-padding-bottom-dbl">
                  <h1>Device Catalog</h1>
                  <p>FirstNet offers an extensive selection of devices and accessories. Check out a small selection of our portfolio. To learn more about our full portfolio, contact a FirstNet Specialist.</p>
                </div>
              </div>
            </div>
            <section className="view-phones">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-8 col-sm-offset-2">
                    <h2>Phones</h2>
                    <ul className="mp-content">
                      {this.mpStore.devicesData.phones.map((phone, idx) => {
                        return (
                          <li key={'phone_'+idx}>{phone.title},{phone.image}</li>
                        )
                      })}
                    </ul>
                    <div className="row">
                    <button className="fn-primary showAll">Explore All Phones</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="view-tablets">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-8 col-sm-offset-2">
                    <h2>Tablets</h2>
                    <ul className="mp-content">
                      {this.mpStore.devicesData.tablets.map((tablet, idx) => {
                        return (
                          <li key={'tablet_'+idx}>{tablet.title},{tablet.image}</li>
                        )
                      })}
                    </ul>
                    <button className="fn-primary showAll">Explore All Tablets</button>
                  </div>
                </div>
              </div>
            </section>
            <section className="view-invehicle">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-8 col-sm-offset-2">
                    <h2>In-Vehicle</h2>
                    <ul className="mp-content">
                      {this.mpStore.devicesData.invehicles.map((iv, idx) => {
                        return (
                          <li key={'iv_'+idx}>{iv.title},{iv.image}</li>
                        )
                      })}
                    </ul>
                    <button className="fn-primary showAll">Explore All In-Vehicle</button>
                  </div>
                </div>
              </div>
            </section>
            <section className="view-accessories">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 col-sm-8 col-sm-offset-2">
                    <h2>Accessories</h2>
                    <ul className="mp-content">
                      {this.mpStore.devicesData.accessories.map((accessory, idx) => {
                        return (
                          <li key={'accessory_'+idx}>{accessory.title},{accessory.image}</li>
                        )
                      })}
                    </ul>
                    <button className="fn-primary showAll">Explore All Accessories</button>
                  </div>
                </div>
              </div>
            </section>
          </article>
        )
    }
}


ShopDevicesPage.propTypes = {
	store: PropTypes.object
};
