/**
 * asForm Higher Order Component
 */
import React, {Component} from 'react'

export default function asForm (MyComponent, formDataProp) {
  return class Form extends Component {
    constructor (props) {
      super(props)
      this.store = this.props.store;

      this.state = {
        hasError: false,
        showAlert: false
      }
    }

    renderAlert = () => {
      //TODO
      return '';
    }

    renderSubmitButton = () => {
      //TODO
      //attach handleSubmit event listener
      return '';
    }

    handleSubmit = (event) => {
      //TODO
      //disable if this.state.hasError
      //call this.props.submit()
    }

    renderExitModal = () => {
      //TODO
      return '';
    }

    showExitModal = () => {
      //TODO
    }

    hideExitModal = () => {
      //TODO
    }

    render () {
      return (
        <div>
          {this.state.showAlert && this.renderAlert()}
          <MyComponent {...this.props}
            showExitModal={this.showExitModal}
            hideExitModal={this.hideExitModal}/>
          {this.renderSubmitButton()}
        </div>
      )
    }
  }
}
