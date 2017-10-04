import React from 'react';
import PropTypes from 'prop-types';


export class TableLoading extends React.Component {

  static propTypes = {
      extended: PropTypes.bool,
  };

  static defaultProps = {
    extended: false
  }

  displayLoadingBlank(className = "") {
	  return <span className={`loading-span ${className}`}/>
  }

  render() {

	return (
  		<tr className="app-loading-row" role="button" tabIndex={0}>
  			<th scope="row">
  				<div className="app-logo" aria-hidden>
  					<span className="loading-img" />
  				</div>
  				<div className="app-name">
  					<p><strong>{this.displayLoadingBlank()}</strong></p>
  					<p><strong>{this.displayLoadingBlank("secondary")}</strong></p>
  				</div>
  			</th>
  			<td>
  				<p className="app-operating-system">{this.displayLoadingBlank()}</p>
  			</td>
  			<td>
  				<p>{this.displayLoadingBlank()}</p>
  			</td>
  			<td>
  				<p>{this.displayLoadingBlank()}</p>
  			</td>
  		</tr>
    )
  }
}
