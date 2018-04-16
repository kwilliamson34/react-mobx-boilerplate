import React from 'react';
import PropTypes from 'prop-types';

import {Router, Route, Switch, Redirect} from 'react-router-dom';
import {history} from './core/services/history.service';

//State Management
import {Provider, observer} from 'mobx-react';
import {masterStore} from './core/stores/master.store';

//Styles
import '../styles/app.scss';

//Common Components
import Header from './components/nav/header';
import Footer from './components/nav/footer.jsx';

//Pages
import SuccessPage from './pages/success.page.jsx';
import ErrorPage from './pages/error.page.jsx';
import DashboardPage from './pages/dashboard.page';
import FeedbackPage from './pages/feedback.page';

@observer
export default class App extends React.Component {

  static props = {
    routing: PropTypes.obj
  }

  getMainLayoutComponent = () => {
    return (
      <div>
        <a href="#main-content" className="skipnav" onClick={this.handleSkipNav}>Skip Navigation</a>
        <Header/>
        <main aria-label="Main Content." id="main-content">
          <Switch>
            <Route exact path="/" component={() => <Redirect to="/home" />} />
            <Route path="/home" component={DashboardPage} />
            <Route path="/feedback" component={FeedbackPage} />
            <Route path="/success" component={SuccessPage} />
            <Route path="/error" component={ErrorPage} />
            <Route component={() => <Redirect to="/error/404" />} />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }

  render() {
    return (
      <Router history={history}>
        <Provider store={masterStore} user={masterStore.getUser()}>
          {this.getMainLayoutComponent()}
        </Provider>
      </Router>
    )
  }
}
