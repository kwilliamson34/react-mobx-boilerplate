import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import config from 'config';

import {NewTabLink} from 'fn-common-ui';

@inject('store')
@observer
export default class Footer extends React.Component {

  static propTypes = {
    store: PropTypes.object,
    showPrivateLinks: PropTypes.bool
  }

  static defaultProps = {
    showPrivateLinks: true
  }

  constructor(props) {
    super(props);
    this.headerStore = this.props.store.headerStore;
    this.externalLinkStore = this.props.store.externalLinkStore;
    this.userStore = this.props.store.userStore;
    this.handleSitemapClick = this.handleSitemapClick.bind(this);
    this.joyrideStore = this.props.store.joyrideStore;
  }

  handleSitemapClick = (e) => {
    e.preventDefault();
    this.headerStore.toggleFooterSitemap();
  }

  handleToggleWalkthrough = () => {
    this.joyrideStore.toggleTour();
  }

  renderSitemapColumn() {
    let sitemapCollapseBreakpoint = 992;
    let allowFocusOnSitemapHeader = this.headerStore.viewportWidth < sitemapCollapseBreakpoint;
    if (this.props.showPrivateLinks) {
      return (<div className="col-xs-12 col-md-3">
        <div aria-describedby="sitemap">
          <a id="sitemap" href="" onClick={this.handleSitemapClick} tabIndex={allowFocusOnSitemapHeader
              ? 0
              : -1} className="sitemap-hdr" role="button" aria-haspopup="true" aria-expanded={this.headerStore.footerSitemapExpanded}>Sitemap</a>
          <ul className="sitemap-links">
            <div>
              {
                this.userStore.destinationIsPermitted.administration && <li role="presentation">
                    <Link to="/admin">PSE Administration</Link>
                  </li>
              }
              {
                this.userStore.destinationIsPermitted.manageApps && <li role="presentation">
                    <Link to="/admin/manage-apps">Manage Apps</Link>
                  </li>
              }
              {
                this.userStore.destinationIsPermitted.shopSpecializedDevices && <li role="presentation">
                    <Link to="/admin/devices">Specialized Devices</Link>
                  </li>
              }
              {
                this.userStore.destinationIsPermitted.shopPublicSafetySolutions && <li role="presentation">
                    <Link to="/admin/solutions" className="as-table-cell">Public Safety Solutions
                    </Link>
                  </li>
              }
            </div>
            {
              this.userStore.destinationIsPermitted.network && <li role="presentation">
                  <Link to="/network">Network</Link>
                </li>
            }
            {
              this.userStore.destinationIsPermitted.incidentUplift && <li role="presentation">
                  <NewTabLink to={config.incidentUpliftLink} showIcon>Uplift</NewTabLink>
                </li>
            }
          </ul>
        </div>
      </div>);
    }
  }

  renderFirstNetColumn() {
    return (<div className={`col-xs-12 ${this.props.showPrivateLinks
        ? 'col-md-3'
        : 'col-md-4'}`}>
      <div aria-describedby="firstnet-sites">
        <h2 id="firstnet-sites">Firstnet Sites</h2>
        <ul >
          <li role="presentation">
            <NewTabLink to={config.firstNetComHome} showIcon={true}>FirstNet.com</NewTabLink>
          </li>
          <li role="presentation">
            <NewTabLink to={config.devPortal} showIcon={true}>Developer Portal</NewTabLink>
          </li>
          <li role="presentation">
            <NewTabLink to={config.appControl} showIcon={true}>App Control</NewTabLink>
          </li>
          <li role="presentation">
            <NewTabLink to={config.appCatalog} showIcon={true}>App Catalog</NewTabLink>
          </li>
        </ul>
      </div>
    </div>);
  }

  renderSocialLinkColumn() {
    return (<div className={`col-xs-12 ${this.props.showPrivateLinks
        ? 'col-md-3'
        : 'col-md-4'}`}>
      <div className="social-nav" aria-describedby="social-links">
        <h2 id="social-links">Follow Us</h2>
        <ul className="social-links-list">
          <li role="presentation">
            <NewTabLink to={config.firstNetFacebook} className="fn-social-icon fb">
              <i aria-hidden="true" className="icon-facebook"></i>
              <span className="title">Facebook</span>
            </NewTabLink>
          </li>
          <li role="presentation">
            <NewTabLink to={config.firstNetLinkedIn} className="fn-social-icon linkedin">
              <i aria-hidden="true" className="icon-linkedin"></i>
              <span className="title">LinkedIn</span>
            </NewTabLink>
          </li>
          <li role="presentation">
            <NewTabLink to={config.firstNetTwitter} className="fn-social-icon twitter">
              <i aria-hidden="true" className="icon-twitter"></i>
              <span className="title">Twitter</span>
            </NewTabLink>
          </li>
          <li role="presentation">
            <NewTabLink to={config.firstNetYouTube} className="fn-social-icon youtube">
              <i aria-hidden="true" className="icon-youtube"></i>
              <span className="title">YouTube</span>
            </NewTabLink>
          </li>
        </ul>
      </div>
    </div>);
  }

  renderHelpColumn() {
    return (<div className={`col-xs-12 ${this.props.showPrivateLinks
        ? 'col-md-3'
        : 'col-md-4'}`}>
      <div aria-describedby="helpLinks">
        <h2 id="helpLinks" className="help-hdr">
          <i className="icon-help" aria-hidden="true"/>
          Help
        </h2>
        <ul className="help-link-block">
          {
            this.props.showPrivateLinks && <li role="presentation">
                <Link to="/faq">FAQ</Link>
              </li>
          }
          {
            this.props.showPrivateLinks && <li role="presentation">
                <NewTabLink to={config.firstnetTraining} showIcon={true}>
                  Training
                </NewTabLink>
              </li>
          }
          {
            this.props.showPrivateLinks && <li role="presentation">
                <a href="#" role="button" className="walkthru-toggle as-table-cell" onClick={this.handleToggleWalkthrough}>
                  {
                    `${this.joyrideStore.tourIsDisabled
                      ? 'Enable'
                      : 'Disable'} Site Walkthrough`
                  }
                </a>
              </li>
          }
          {
            this.props.showPrivateLinks && <li role="presentation">
                <Link to="/feedback">Give Us Feedback</Link>
              </li>
          }
          <li role="presentation">
            <span aria-hidden="aria-hidden">FirstNet Customer Svc</span><br className={`visible-xs-inline-block visible-md-inline-block ${this.props.showPrivateLinks
        ? ''
        : 'visible-lg-inline-block'}`}/>
            <a href={'tel:' + config.attDialNumber}>
              <i className="icon-phone-number footer-support-phone" aria-hidden='true'></i>
              <span className="sr-only">FirstNet Customer Service Phone&nbsp;</span>
              {config.attPhoneNumber}
            </a>
          </li>
        </ul>
      </div>
    </div>);
  }

  renderBottomNav() {
    return (<div>
      <ul className="sub-links">
        <li role="presentation">
          <NewTabLink to={config.firstNetPrivacy}>
            Privacy Policy
          </NewTabLink>
        </li>
        <li role="presentation">
          <NewTabLink to={config.firstNetTermsConditions}>
            Terms of Use
          </NewTabLink>
        </li>
        <li className="xs-line-break"></li>
        <li role="presentation">
          <NewTabLink to={config.firstNetAccessibility}>
            Accessibility
          </NewTabLink>
        </li>
        <li role="presentation">
          <NewTabLink to={config.firstNetGovHome}>
            FirstNet.gov
          </NewTabLink>
        </li>
      </ul>
    </div>);
  }

  render() {
    return (<div className="footer-container">
      <footer id="pse-footer">
        <nav aria-label="Supporting Navigation.">
          <div className="footer-main">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 logoRow">
                  {
                    this.props.showPrivateLinks
                      ? <Link to="/" className="logo-home-link-footer">
                          <img src="/images/logo-FirstNet-local-control.svg" alt="FirstNet Local Control logo"/>
                          <span className="sr-only">Go Home</span>
                        </Link>
                      : <img src="/images/logo-FirstNet-local-control.svg" alt="FirstNet Local Control logo"/>
                  }
                </div>
              </div>
              <div className="row is-flex">
                {this.renderSitemapColumn()}
                {this.renderFirstNetColumn()}
                {this.renderSocialLinkColumn()}
                {this.renderHelpColumn()}
              </div>
            </div>
          </div>
          <div className="footer-sub">
            <div className="container">
              <div className="row">
                <div className="col-xs-12">
                  {this.renderBottomNav()}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </footer>
    </div>);
  }
}
