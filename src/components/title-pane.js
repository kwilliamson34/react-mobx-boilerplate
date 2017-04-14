import React from 'react';
import {Link} from 'react-router-dom';

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
              </div>
              </div>
            </div>
        )
    }

};
