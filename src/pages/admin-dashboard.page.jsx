import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import NewTabLink from '../components/link/new-tab-link';
import config from 'config';
import {adminCards, asideCards} from '../content/admin-cards.js';
import PageTitle from '../components/page-title/page-title';

@inject('store')
@observer
export default class AdminDashboardPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }
  
  constructor(props) {
    super(props);
    this.store = this.props.store.userStore;
  }
  
  renderPermissionedCard(card, key = 1) {
    //check if we are using a local or extenrnal link, and act accordingly.
    let LinkType = card.linkTo[0] === '/' ? Link : NewTabLink;
    let linkDest = card.linkTo[0] === '/' ? card.linkTo : config[card.linkTo]
    //render if we are allowed
    const isPermitted = this.store.destinationIsPermitted;
    if(isPermitted[card.isPermitted]){
      return (
        <li className="col-xs-12" key={key}>
          <LinkType to={linkDest} className={`dashboard-card ${card.className} has-shadow`}>
            <div className="desc">
              <h3>{card.header}</h3>
              <p>{card.description}</p>
            </div>
            <span>{card.callToAction || card.header} <i className="icon-arrowRight" aria-hidden="true"></i></span>
          </LinkType>
        </li>
      )
    }
  }
  
  render() {
    const isPermitted = this.store.destinationIsPermitted;
    const hideAside = !(isPermitted.shopStandardDevices || isPermitted.shopSpecializedDevices || isPermitted.shopPublicSafetySolutions);
    return (
      <article id="admin-dashboard-page">
        <div className="container">
          <div className="col-xs-12">
            <PageTitle>Administration</PageTitle>
          </div>
          <div className="row no-gutters">
            <section className={`col-xs-12 ${hideAside ? 'hide-aside' : 'col-lg-8'} manage-actions`}>
              {!hideAside && <div className="col-xs-12">
                <h2 className="as-h4">Management</h2>
              </div>}
              <nav>
                <ul>
                  {adminCards.map((card, i) => {
                    return this.renderPermissionedCard(card, i)
                  })}
                </ul>
              </nav>
            </section>
            {!hideAside && <aside className="col-xs-12 col-lg-4 shop-actions">
              <div className="col-xs-12">
                <h2 className="as-h4">Purchasing &amp; Provisioning</h2>
              </div>
              <nav>
                <ul>
                  {asideCards.map((card, i) => {
                    return this.renderPermissionedCard(card, i)
                  })}
                </ul>
              </nav>
            </aside>}
          </div>
        </div>
      </article>
    )
  }
}