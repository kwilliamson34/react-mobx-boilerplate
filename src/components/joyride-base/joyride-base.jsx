import React from 'react';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import { observer, inject } from 'mobx-react';
import $ from 'jquery';

@inject('store')
@observer
export default class JoyrideBase extends React.Component {
  static propTypes = {
		store: PropTypes.object
	};

  constructor(props){
    super(props)
    this.joyrideStore = this.props.store.joyrideStore;
  }

  componentDidMount() {
    let cookieVal = this.joyrideStore.checkWalkthruCookie();
    //check for presence of cookie
    if(cookieVal){
      this.joyrideStore.initJoyride();
    } else if(cookieVal === ''){
      //no cookie present; show walkthru intro
      console.log('cookie not present');
      
    } else {
      this.joyrideStore.disableWalkthru();
    }
  }

  startWalkthru() {
    this.joyrideStore.initJoyride(this.joyride);
  }


  render(){
    return(
      <Joyride
        ref={c => (this.joyride = c)}
        steps={this.joyrideStore.steps}
        run={this.joyrideStore.isReady}
        autoStart={true}
        showOverlay={this.joyrideStore.joyrideOverlay}
        type={this.joyrideStore.joyrideType}
      />
    )
  }
}
