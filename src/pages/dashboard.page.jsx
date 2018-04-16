import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom';

import BreadcrumbNav from '../components/nav/breadcrumb-nav';

@inject('store')
@observer
export default class DashboardPage extends React.Component {

  static propTypes = {
    store: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.store = this.props.store.userStore;
  }

  render() {
    const links = [
      {
        pageHref: '',
        pageTitle: 'Home'
      }
    ]
    return (
      <article id="dashboard-page">
        <BreadcrumbNav links={links}></BreadcrumbNav>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>Welcome to your dashboard</h1>
              <ul>
                <li>
                  <Link to="/success">Success Page</Link>
                </li>
                <li>
                  <Link to="/error">Error Page</Link>
                </li>
                <li>
                  <Link to="/feedback">Feedback Page</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>
    )
  }
}
