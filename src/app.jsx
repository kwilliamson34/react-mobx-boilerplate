import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {history} from './core/services/history.service';
import $ from 'jquery';
import config from 'config';

//State Management
import {Provider, observer} from 'mobx-react';
import {pseMasterStore} from './core/stores/master.store';

//Utilities
import {utilsService} from './core/services/utils.service';

//Styles
import '../styles/app.scss';

//Common Components
import Header from './components/header/header';
import Footer from './components/footer/footer.jsx';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';
import JoyrideBase from './components/joyride-base/joyride-base';

//Pages
import NetworkPage from './pages/network.page';
import ErrorPage from './pages/error.page.jsx';
import SuccessPage from './pages/success.page.jsx';
import SessionTimeoutPage from './pages/session-timeout.page';
import SubscribeToGTOC from './pages/gtoc.page';
import ManageFavoritesPage from './pages/manage-favorites.page';

//Admin pages
import ManageAppsPage from './pages/manage-apps.page';
import AdminDashboardPage from './pages/admin-dashboard.page';
import ConfigureMDM from './pages/configure-mdm.page';

//Marketing Portal pages
import DevicesLandingPage from './pages/devices.page';
import DeviceCategoryTemplate from './pages/device-category.template';
import DeviceDetailTemplate from './pages/device-detail.template';
import ShopSolutionsPage from './pages/shop-solutions.page';
import LeadCapturePage from './pages/lead-capture.page';

//Content pages
import AppDetailsPage from './pages/app-details.page';
import SolutionsDetailTemplate from './pages/solutions-details.template';
import SolutionsCategoryTemplate from './pages/solutions-category.template';

//Help section
import HelpCenterPage from './pages/help-center.page';
import FAQPage from './pages/faq.page';
import FeedbackPage from './pages/feedback.page';

//Components
import ExternalRedirect from './components/external-redirect/external-redirect';

@observer
export default class App extends React.Component {

  static props = {
    routing: PropTypes.obj
  }

  componentWillMount() {
    //check for URL token parameter
    const urlToken = utilsService.getUrlParameter('token');
    if (urlToken && urlToken.length > 0) {
      pseMasterStore.userStore.initUserObject(urlToken);
    } else {
      //get token the long way
      pseMasterStore.userStore.validateUser();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', function(e) {
      if (e.keyCode === 9) {
        $('body').addClass('show-focus-styles');
      }
    });

    document.addEventListener('click', function() {
      $('body').removeClass('show-focus-styles');
    });
  }

  handleSkipNav = () => {
    //Fix for FPSE-1393 and FPSE-1394. Skip Navigation is not working on IE, as elements without a tabIndex don't take focus. For 508 compliance, #main-content can't permanently have a tabIndex.
    const mainContent = $('#main-content');
    mainContent.attr('tabindex', -1);
    mainContent.focus();
    mainContent.blur(() => {
      mainContent.removeAttr('tabindex');
    });
  }

  getSpecializedDevicesComponent = ({match}) => {
    return (
      <article id="specialized-devices">
        <Switch>
          <Route path={`${match.url}/:deviceCategory/:deviceId`} component={DeviceDetailTemplate} />
          <Route path={`${match.url}/:deviceCategory`} component={DeviceCategoryTemplate} />
          <Route path={match.url} component={DevicesLandingPage} />
        </Switch>
      </article>
    )
  }

  getPublicSafetySolutionsComponent = ({match}) => {
    return (
      <article id="solutions-hub-page">
        <Switch>
          <Route path={`${match.url}/:solutionCategory/:solutionDetail/request-info`} component={LeadCapturePage} />
          <Route path={`${match.url}/:solutionCategory/:solutionDetail`} component={SolutionsDetailTemplate} />
          <Route path={`${match.url}/:solutionCategory`} component={SolutionsCategoryTemplate} />
          <Route path={match.url} component={ShopSolutionsPage} />
        </Switch>
      </article>
    )
  }

  getMainLayoutComponent = () => {
    const permissionObject = pseMasterStore.userStore.destinationIsPermitted;
    return (
      <div>
        {config.showOnboardingWalkthrough &&
          <JoyrideBase location={location.pathname} joyrideStore={pseMasterStore.joyrideStore} />
        }
        <ScrollToTop>
          <a href="#main-content" className="skipnav" onClick={this.handleSkipNav}>Skip Navigation</a>
          <Header/>
          <main id="main-content">
            <Switch>
              <Route exact path="/" component={() => <Redirect to="/admin" />} />
              <Route path="/admin/manage-apps" component={this.checkRoutePermission({
                  component: ManageAppsPage,
                  isPermitted: permissionObject.manageApps
                })} />
              <Route path="/admin/configure-mdm" component={this.checkRoutePermission({
                  component: ConfigureMDM,
                  isPermitted: permissionObject.manageApps
                })} />
              <Route path="/admin/devices" component={this.checkRoutePermission({
                  component: this.getSpecializedDevicesComponent,
                  isPermitted: permissionObject.shopSpecializedDevices
                })} />
              <Route path="/admin/solutions" component={this.checkRoutePermission({
                  component: this.getPublicSafetySolutionsComponent,
                  isPermitted: permissionObject.shopPublicSafetySolutions
                })} />
              <Route path="/admin" component={this.checkRoutePermission({
                  component: AdminDashboardPage,
                  isPermitted: permissionObject.administration,
                  redirectPath: '/network'
                })} />
              <Route path="/app/:appPsk" component={this.checkRoutePermission({
                  component: AppDetailsPage,
                  isPermitted: permissionObject.manageApps
                })/*TODO redirect to error/404 if psk has no match*/} />
              <Route path="/network" component={this.checkRoutePermission({
                  component: NetworkPage,
                  isPermitted: permissionObject.network
                })} />
              <Route path="/manage-favorites" component={ManageFavoritesPage} />
              <Route path="/subscribe-to-alerts" component={SubscribeToGTOC} />
              <Route path="/feedback" component={FeedbackPage} />
              <Route path="/success" component={SuccessPage} />
              <Route path="/faq" component={FAQPage} />
              <Route path="/help-center" component={HelpCenterPage} />
              <Route component={() => <Redirect to="/error/404" />} />
            </Switch>
          </main>
          <Footer />
        </ScrollToTop>
      </div>
    );
  }

  checkRoutePermission = ({
    component,
    isPermitted,
    redirectPath = '/error/unauthorized'
  }) => {
    return isPermitted
      ? component
      : () => <Redirect to={redirectPath} />;
  }

  getPlainLayoutComponent = () => {
    return (
      <Switch>
        <Route exact path="/error/404" component={() => <ErrorPage cause="404" />} />
        <Route exact path="/error/unauthorized" component={() => <ErrorPage cause="unauthorized" />} />
        <Route exact path="/error/unavailable" component={() => <ErrorPage cause="410" />} />
        <Route exact path="/error/pending" component={() => <ErrorPage cause="pending" />} />
        <Route path="/error" component={ErrorPage} />
        <Route component={() => <Redirect to="/error/404" />} />
      </Switch>
    )
  }

  getSessionDependentContent() {
    return pseMasterStore.userStore.userValidationDone
      ? (
        pseMasterStore.isLoggedIn
        ? <Switch>
            <Route exact path="/session-timeout" component={SessionTimeoutPage} />
            <Route path="/error" component={this.getPlainLayoutComponent} />
            <Route component={this.getMainLayoutComponent} />
          </Switch>
        : (pseMasterStore.userStore.isSubscriber
          ? <ExternalRedirect externalUrl={config.appStore} />
          : <ErrorPage cause="unauthorized" />))
      : <div className="fn-loading">
          <div className="fn-loading-logo">
            <img src="/images/firstnet-logo.svg" width="173" height="51" alt="FirstNet logo" />
          </div>
          <h1 className="fn-loading-text">Loading</h1>
          <div className="fn-loading-circle">
            {[...Array(12)].map((x, i) =>
              <div key={i} className={`c${i+1} c`}></div>
            )}
          </div>
        </div>
  }

  render() {
    return (
      <Router history={history}>
        <Provider store={pseMasterStore} user={pseMasterStore.getUser()}>
          {this.getSessionDependentContent()}
        </Provider>
      </Router>
    )
  }
}
