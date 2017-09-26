import React from 'react';
import PropTypes from 'prop-types';

export default class ExternalRedirect extends React.Component {
  static propTypes = {
    externalUrl: PropTypes.string
  };

  constructor(props){
    super(props);
  }

  componentWillMount(){
    window.location.href = this.props.externalUrl;
  }

}
