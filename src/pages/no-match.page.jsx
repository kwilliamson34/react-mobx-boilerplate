import React from 'react';
import PropTypes from 'prop-types';

export default class NoMatch extends React.Component {
    constructor(props){
      super(props);
    }

    render() {
        return (
            <main id="content-main">
                <div className="container">
                  <div className="row">
                    <div className="col-xs-12">
                      <h1>Error 404</h1>
                      <h2>No match for <code>{this.props.location.pathname}</code></h2>
                    </div>
                  </div>
                </div>
            </main>
        )
    }

}

NoMatch.propTypes = {
	location: PropTypes.object
};
