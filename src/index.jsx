import React from 'react';
import ReactDOM from 'react-dom';

import { PageHeader, Button } from 'react-bootstrap';

import {observer} from 'mobx-react';

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

import {appStore} from './core/stores/app.store';

import '../styles/app.scss';

@observer class App extends React.Component {

	constructor(props) {
		super(props);
		this.store = this.props.store;
	}


	// Events
	onAddName = () => {
		this.store.addName();
	};

	onHandleChange = (e) => {
		this.store.nameFieldChange(e.target.value);
	};

	onLoadEmployee = () => {
		this.store.loadEmployee();
	};

	onRemoveName = (idx) => {
		this.store.removeName(idx);
	};


	// JSX Rendering Functions
	showEmployeeData = () => {
		let jsx = '';
		if (this.store.employee.hasOwnProperty('name')) {
			jsx = (
					<div>
						<h3>Name: {this.store.employee.name}</h3>
						<p><strong>Title: </strong>{this.store.employee.title}</p>
						<p><strong>Office: </strong>{this.store.employee.office}</p>
						<p><strong>Biography: </strong>{this.store.employee.bio}</p>
						<img src={this.store.employee.image} alt="image"></img>
					</div>
			);
		}
		return jsx;
	};

	showLastNameAdded = () => {
		let jsx = '';
		if (this.store.names.length > 0) {
			jsx = <h2>Last name added: {this.store.lastNameAdded}</h2>;
		}
		return jsx;
	};


	render() {
		return (
			<div>
				<Header />
				<main  className="container">
					<PageHeader>Proposed Architecture</PageHeader>

					<h2>How about we add some names!</h2>

					{this.showLastNameAdded()}

					<div>
			       	 	<span>
							<input value={this.store.nameFieldStr}
							 placeholder={this.store.nameFieldPlaceholder}
							 onChange={this.onHandleChange}/>
			       	 	</span>
			       	 	<span>
			       	 		<Button onClick={this.onAddName} bsStyle="primary">Add Name</Button>
			       	 	</span>
					</div>

					{this.store.names.map((name, idx) => {
						return (
						<p key={idx}>
							<span>{name} </span>
		        			<span>
		        				<Button onClick={() => {this.onRemoveName(idx)}} bsStyle="danger">Remove</Button>
		        			</span>
						</p>
						)
					})}

					<hr />

					<h2>How about we load some data from an API!</h2>
					<button onClick={this.onLoadEmployee}>Load Employee</button>

					{this.showEmployeeData()}


				</main>
				<Footer />
			</div>
		)
	}
}

ReactDOM.render(<App store={appStore}/>, document.getElementById('app'));
