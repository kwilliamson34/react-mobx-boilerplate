import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import GtocForm from '../components/gtoc/gtoc-form';
import PageTitle from '../components/page-title/page-title';

@inject('store')
@observer
export default class SubscribeToGTOC extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  render() {
    return (
      <section id="subscribe-to-gtoc-page">
        <div className="content-wrapper">
          <div className="container">
            <div className="row text-center">
              <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8">
                <PageTitle>Subscribe to Network Alerts</PageTitle>
              </div>
              <div className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <figure>
                  <figcaption>FEMA Regions Map</figcaption>
                  <img className="img-responsive" src="/images/fema-regions-map.png" alt=""/>
                </figure>
              </div>
            </div>
            <div className="row">
              <section className="col-xs-offset-1 col-xs-10 col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
                <GtocForm store={this.props.store.gtocStore}/>
              </section>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
