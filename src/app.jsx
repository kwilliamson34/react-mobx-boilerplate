import React from 'react';
import {Router, Route, Switch, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import {history} from './core/services/history.service';

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
import ScrollToTop from './core/services/scroll-to-top';

//Pages
import NetworkStatusPage from './pages/network-status.page';
import ErrorPage from './pages/error.page.jsx';

//Admin pages
import ManageUsersPage from './pages/manage-users.page';
import ManageBillingPage from './pages/manage-billing.page';
import ManageServicesPage from './pages/manage-services.page';
import ManageAppsPage from './pages/manage-apps.page';
import ManagePushToTalkPage from './pages/manage-push-to-talk.page';
import ManageWirelessReportsPage from './pages/manage-wireless-reports.page';
import AdminDashboardPage from './pages/admin-dashboard.page';
import ConfigureMDM from './pages/configure-mdm.page';
import ShopDevicesPage from './pages/shop-devices-rates.page';

//Marketing Portal pages
import DevicesLandingPage from './pages/devices.page';
import DeviceCategoryTemplate from './pages/device-category.template';
import DeviceDetailTemplate from './pages/device-detail.template';
import ShopSolutionsPage from './pages/shop-solutions.page';

//Content pages
import AppDetailsPage from './pages/app-details.page';
import SolutionsDetailTemplate from './pages/solutions-details.template';
import SolutionsCategoryTemplate from './pages/solutions-category.template';

//Help section
import HelpCenterPage from './pages/help-center.page';

import FAQPage from './pages/faq.page';
import FeedbackPage from './pages/feedback.page';
import ManageProfilePage from './pages/manage-profile.page';

//Footer pages
import PrivacyPage from './pages/privacy.page';
import TermsOfServicePage from './pages/terms.page';
import AccessibilityPage from './pages/accessibility.page';


@observer
export default class App extends React.Component {

  static props = {
    routing: PropTypes.obj
  }

  componentWillMount() {
    //check for URL token parameter
		const urlToken = utilsService.getUrlParameter('token');
		if(urlToken && urlToken.length > 0) {
			pseMasterStore.userStore.initUserObject(urlToken);
		} else {
			//get token the long way
			pseMasterStore.userStore.revalidateUser();
		}
  }

  getSpecializedDevicesComponent = ({match}) => {
    return (
      <article id="specialized-devices">
        <Switch>
          <Route path={`${match.url}/:deviceCategory/:deviceId`} component={DeviceDetailTemplate}/>
          <Route path={`${match.url}/:deviceCategory`} component={DeviceCategoryTemplate}/>
          <Route path={match.url} component={DevicesLandingPage}/>
        </Switch>
      </article>
    )
  }

	getPublicSafetySolutionsComponent = ({match}) => {
		return (
			<article id="solutions-hub-page">
				<Switch>
					<Route path={`${match.url}/:solutionCategory/:solutionDetail`} component={SolutionsDetailTemplate} />
					<Route path={`${match.url}/:solutionCategory`} component={SolutionsCategoryTemplate} />
					<Route path={match.url} component={ShopSolutionsPage} />
				</Switch>
			</article>
		)
	}

  getLandingPage = () => {
    //TODO: Temporarily using @observable authentic_user in lieu of actual authorization check
    const userIsAdmin = pseMasterStore.userStore.authentic_user;

    return (
      <Switch>
        {
          userIsAdmin
          ? <Redirect to="/admin" />
          : <Redirect to="/network-status" />
        }
      </Switch>
    )
  }

  getMainLayoutComponent = () => {
    return (
      <ScrollToTop>
        <div id="PSE-wrapper">
          <a href="#main-content" className="sr-only sr-only-focusable">Skip Navigation</a>
          <Header/>
          <main id="main-content">
            <Switch>
              <Route exact path="/" component={this.getLandingPage}/> /*TODO replace with landing page*/
              <Route path="/network-status" component={NetworkStatusPage}/>
              <Route path="/admin/manage-users" component={ManageUsersPage}/>
              <Route path="/admin/manage-billing" component={ManageBillingPage}/>
              <Route path="/admin/manage-services" component={ManageServicesPage}/>
              <Route path="/admin/manage-apps" component={ManageAppsPage}/>
              <Route path="/admin/configure-mdm" component={ConfigureMDM}/>
              <Route path="/admin/manage-push-to-talk" component={ManagePushToTalkPage}/>
              <Route path="/admin/manage-wireless-reports" component={ManageWirelessReportsPage}/>
              <Route path="/admin" component={AdminDashboardPage}/>
              <Route path="/app/:appPsk" component={AppDetailsPage/*TODO redirect to error/404 if psk has no match*/}/>
              <Route path="/manage-profile" component={ManageProfilePage}/>
              <Route path="/feedback" component={FeedbackPage}/>
              <Route path="/faq" component={FAQPage}/>
              <Route path="/shop-devices-rates" component={ShopDevicesPage}/>
              <Route path="/devices" component={this.getSpecializedDevicesComponent}/>
              <Route path="/solutions" component={this.getPublicSafetySolutionsComponent}/>
              <Route path="/help-center" component={HelpCenterPage}/>
              <Route path="/faq" component={FAQPage}/>
              <Route path="/privacy" component={PrivacyPage}/>
              <Route path="/terms" component={TermsOfServicePage}/>
              <Route path="/accessibility" component={AccessibilityPage}/>
              <Route component={() => <Redirect to="/error/404"/>}/>
            </Switch>
          </main>
          <Footer/>
        </div>
      </ScrollToTop>
    )
  }

  getPlainLayoutComponent = () => {
    return (
      <Switch>
        <Route exact path="/error/404" component={() => <ErrorPage cause="404"/>}/>
        <Route exact path="/error/unauthorized" component={() => <ErrorPage cause="unauthorized"/>}/>
        <Route path="/error" component={ErrorPage}/>
        <Route component={() => <Redirect to="/error/404"/>}/>
      </Switch>
    )
  }

  getSessionDependentContent() {
    return pseMasterStore.userStore.userValidationDone ? (
			pseMasterStore.isLoggedIn ? (
				<Switch>
					<Route path="/error" component={this.getPlainLayoutComponent}/>
					<Route component={this.getMainLayoutComponent}/>
				</Switch>
			) : (
				<ErrorPage cause="unauthorized" />
			)
		) : (
			<p>Securing Session...</p>
		);
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
