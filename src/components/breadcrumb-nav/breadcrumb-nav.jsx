import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class BreadcrumbNav extends React.Component {

  static propTypes = {
    links: PropTypes.array
  }

  render() {
    return(
      <nav className="breadcrumb-nav xs-hidden" aria-label="You are here:">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <ol>
                {this.props.links.map((crumb,idx) => {
                  return (
                    <li key={idx}>
                      <Link to={crumb.pageHref}>{crumb.pageTitle}<span className="icon-arrowRight" aria-hidden="true"></span></Link>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
