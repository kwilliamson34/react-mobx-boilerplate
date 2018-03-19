import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';
import {NewTabLink} from 'fn-common-ui';
import config from 'config';
import {adminCards, asideCards} from '../content/admin-cards.js';
import PageTitle from '../components/page-title/page-title';

@inject('store')
@observer
export default class AdminDashboardPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  @observable numCardsShown = 0;
  @observable adminCardsToShow = [];
  @observable asideCardsToShow = [];

  constructor(props) {
    super(props);
    this.store = this.props.store.userStore;

    const isPermitted = this.store.destinationIsPermitted;
    this.adminCardsToShow = adminCards.filter(card => {
      return isPermitted[card.isPermitted]
    });
    this.asideCardsToShow = asideCards.filter(card => {
      return isPermitted[card.isPermitted]
    });
    this.numCardsShown = this.adminCardsToShow.length + this.asideCardsToShow.length;
  }

  renderCard(card, key = 1) {
    //check if we are using a local or external link
    const isInternalLink = card.linkTo[0] === '/';
    const LinkTag = isInternalLink ? Link : NewTabLink;
    const linkDest = isInternalLink ? card.linkTo : config[card.linkTo]
    const callToAction = card.callToAction || card.header;

    return (
      <li className="col-xs-12" key={key}>
        <LinkTag to={linkDest} className={`dashboard-card ${card.className} has-shadow`}>
          <div className="desc">
            <h3 dangerouslySetInnerHTML={ {__html: card.header} }></h3>
            <p dangerouslySetInnerHTML={ {__html: card.description} }></p>
          </div>
          <span>
            <span dangerouslySetInnerHTML={ {__html: callToAction} }></span>&nbsp;<i className={isInternalLink ? 'icon-arrowRight' : 'icon-external-site'} aria-hidden="true"></i>
          </span>
        </LinkTag>
      </li>
    )
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
          <div className="row no-gutters walkthrough-admin-dashboard" numcards={this.numCardsShown}>
            <section className={`col-xs-12 ${hideAside ? 'hide-aside' : 'col-lg-8'} manage-actions`}>
              {!hideAside && <div className="col-xs-12">
                <h2 className="as-h4">Management</h2>
              </div>}
              <div>
                <ul>
                  {this.adminCardsToShow.map((card, i) => {
                    return this.renderCard(card, i)
                  })}
                </ul>
              </div>
            </section>
            {!hideAside && <aside className="col-xs-12 col-lg-4 shop-actions">
              <div className="col-xs-12">
                <h2 className="as-h4">Purchasing &amp; Provisioning</h2>
              </div>
              <div>
                <ul>
                  {this.asideCardsToShow.map((card, i) => {
                    return this.renderCard(card, i)
                  })}
                </ul>
              </div>
            </aside>}
          </div>
        </div>
      </article>
    )
  }
}
