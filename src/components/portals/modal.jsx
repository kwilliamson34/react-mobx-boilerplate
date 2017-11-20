import React from 'react';
import Portal from './portal';
import PropTypes from 'prop-types';
import $ from 'jquery';
import {observer} from 'mobx-react';
import {observable, autorun} from 'mobx';

@observer
export default class Modal extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    primaryAction: PropTypes.func.isRequired,
    primaryButtonLabel: PropTypes.string,
    secondaryAction: PropTypes.func,
    secondaryButtonLabel: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array
    ])
  }

  static defaultProps = {
    primaryButtonLabel: 'Save',
    secondaryButtonLabel: 'Exit',
    children: ''
  }

  @observable show = false;

  constructor(props) {
    super(props);
    autorun(() => {
      // show or hide the modal using bootstrap methods
      if(this.show) {
        $(this.modal).modal({backdrop: 'static'});
        $(this.modal).modal('show');
      } else {
        $(this.modal).modal('hide');
        $(this.modal).data('bs.modal', null);
      }
    });
  }

  onKeyDown = (e) => {
    //close modal if user hits Escape key
    if (e.keyCode == 27) {
      this.hideModal();
    }
  }

  toggleModal = () => {
    this.show = !this.show;
  }

  showModal = () => {
    this.show = true;
  }

  hideModal = () => {
    this.show = false;
  }

  render() {
    return (
      <div className="modal-wrapper" onKeyDown={this.onKeyDown}>
        <Portal>
          <div id={this.props.id}
            ref={i => this.modal = i}
            role="dialog"
            tabIndex={'-1' /* Required to trap focus */}
            className="modal fade"
            aria-labelledby={this.props.id + '-aria-text'}>

            <div className="modal-dialog">
              <div className="modal-content">
                <button type="button" className="fn-modal-close" onClick={this.hideModal}>
                  <i aria-hidden="true" className="icon-close"></i>
                  <span className="sr-only">Close window</span>
                </button>
                <div className="row no-gutters" id={this.props.id + '-aria-text'}>
                  <div className="col-xs-12 text-center">
                    <h1 className="as-h2">{this.props.title}</h1>
                    {this.props.children}
                  </div>
                </div>
                <div className="row no-gutters modal-actions">
                  <div className="col-xs-12 text-center">
                    {/* If there are two buttons, the primary button should be on the right. */}
                    {this.props.secondaryAction !== undefined &&
                      <button className="fn-secondary" onClick={this.props.secondaryAction}>
                        {this.props.secondaryButtonLabel}
                      </button>}
                    <button className="fn-primary" onClick={this.props.primaryAction}>
                      {this.props.primaryButtonLabel}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      </div>
    );
  }
}
