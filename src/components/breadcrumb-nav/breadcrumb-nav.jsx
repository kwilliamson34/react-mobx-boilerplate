import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class BreadcrumbNav extends React.Component {

  static propTypes = {
    links: PropTypes.array
  }

  render() {
    return(
      <nav className="breadcrumb-nav hidden-xs" aria-label="You are here:">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <ol>
                {this.props.links.map((crumb,idx) => {
                  let displayAsLink = idx < this.props.links.length - 1;
                  return (
                    <li key={idx}>
                      <Link to={crumb.pageHref} tabIndex={displayAsLink ? 0 : -1} dangerouslySetInnerHTML={{__html: crumb.pageTitle}}></Link>
                      <span className="icon-arrowRight" aria-hidden="true"></span>
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
