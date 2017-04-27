import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export default class TitlePane extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <div className="title-pane">
              <div className="container-fluid">
                <div className="container">
                  <h1>{this.props.pageTitle}</h1>
                <Link to="/admin" role="button" className="btn-dashboard">Administration Dashboard ></Link>
                <Link to="/manage-apps" role="button" className="btn-dashboard">Manage Apps (temp)></Link>
              </div>
              </div>
            </div>
        )
    }
}

TitlePane.propTypes = {
  pageTitle: PropTypes.string.isRequired
};
