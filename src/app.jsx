import 'jquery';
import 'bootstrap';

import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import ScrollToTop from './core/services/scroll-to-top';

//State Management
import { Provider, observer } from 'mobx-react';
import { pseMasterStore } from './core/stores/master.store';

import { userStore } from './core/stores/user.store';

//Styles
import '../styles/app.scss';

//Common Components
import Header from './components/header/header';
import Footer from './components/footer/footer.jsx';

//Pages
import NetworkStatusPage from './pages/network-status.page';

//admin
import ManageUsersPage from './pages/manage-users.page';
import ManageBillingPage from './pages/manage-billing.page';
import ManageServicesPage from './pages/manage-services.page';
import ManageAppsPage from './pages/manage-apps.page';
import ManagePushToTalkPage from './pages/manage-push-to-talk.page';
import ManageWirelessReportsPage from './pages/manage-wireless-reports.page';
import AdminDashboardPage from './pages/admin-dashboard.page';
import ConfigureMDM from './pages/configure-mdm.page';

//MP pages
import ShopDevicesPage from './pages/shop-devices-rates.page'
import ShopSpecializedDevicesPage from './pages/shop-specialized-devices.page';
import ShopSolutionsPage from './pages/shop-solutions.page';

//content pages
import AppDetailsPage from './pages/app-details.page';

//Help section
import HelpCenterPage from './pages/help-center.page';

import PrivacyPage from './pages/privacy.page';
import TermsOfServicePage from './pages/terms.page';
import AccessibilityPage from './pages/accessibility.page';

import NoMatch from './pages/no-match.page';

import { UnauthenticUser } from './pages/unauth-user.page.jsx';

@observer
export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		userStore.validateUser();
	}

	render() {
		const AppHub = ({
			match
		}) => {
			return (
				<div id="app-page">
					<Switch>
						<Route path={`${match.url}/:appPsk`} component={AppDetailsPage} />
						<Route exact path={match.url} render={() => (
							<article>
								<div className="container">
									<div className="col-xs-12">
										<h1 className="as-h2">Sorry.</h1>
										<p>We couldn't find the app you were looking for.  <Link to="manage-apps">Go to the App Catalog</Link></p>
									</div>
								</div>
							</article>
						)}/>
					</Switch>
				</div>
			)
		}

		//redirect until new landing is figured out
		const TempHomePage = () => {
			return (
				<Redirect to="/admin" />
			)
		}

		const ShopSolutionsHub = ({match}) => {
			return(
				<div id="shop-solutions-hub-page">
					<Switch>
						<Route path={match.url} component={ShopSolutionsPage} />
						<Route path={`${match.url}/:solutionCategory`} component={SolutionsCategoryPage} />
						<Route path={`${match.url}/:solutionCategory/:solutionDetail`} component={SolutionsDetailPage} />
						<Route exact path={match.url} render={() => (
								<article>
									<div className="container">
										<div className="col-xs-12">
											<h1 className="as-h2">Sorry.</h1>
											<p>We couldn't find the solution you were looking for. <Link to="solutions">Go to the Solutions page</Link></p>
										</div>
									</div>
								</article>
							)}/>
					</Switch>
				</div>
			)
		}

		return userStore.authentic_user ? (
			<Router>
				<Provider store={pseMasterStore}>
					<ScrollToTop>
						<div id="PSE-wrapper">
							<a href="#main-content" className="sr-only sr-only-focusable">Skip Navigation</a>
							<Header/>
							<main id="main-content">
								<Switch>
									<Route exact path="/" component={TempHomePage}/>
									<Route path="/network-status" component={NetworkStatusPage}/>
									<Route path="/admin/manage-users" component={ManageUsersPage} />
									<Route path="/admin/manage-billing" component={ManageBillingPage} />
									<Route path="/admin/manage-services" component={ManageServicesPage} />
									<Route path="/admin/manage-apps" component={ManageAppsPage} />
									<Route path="/admin/configure-mdm" component={ConfigureMDM} />
									<Route path="/admin/manage-push-to-talk" component={ManagePushToTalkPage} />
									<Route path="/admin/manage-wireless-reports" component={ManageWirelessReportsPage} />
									<Route path="/admin" component={AdminDashboardPage} />
									<Route path="/app" component={AppHub} />
									<Route path="/shop-devices-rates" component={ShopDevicesPage} />
									<Route path="/shop-specialized-devices" component={ShopSpecializedDevicesPage} />
									<Route path="/solutions" component={ShopSolutionsHub} />
									<Route path="/help-center" component={HelpCenterPage} />
									<Route path="/privacy" component={PrivacyPage}/>
									<Route path="/terms" component={TermsOfServicePage}/>
									<Route path="/accessibility" component={AccessibilityPage}/>
									<Route component={NoMatch}/>
								</Switch>
							</main>
							<Footer/>
						</div>
					</ScrollToTop>
				</Provider>
			</Router>
		) : (
			<UnauthenticUser />
		);
	}
}
