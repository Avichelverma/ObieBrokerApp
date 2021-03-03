import './App.scss';
import React, { Component } from 'react';
import Footer from './components/Footer/Footer.component';
import Header from './components/Header/Header.component';

import { Card, Col, Form, Row, Button } from 'react-bootstrap';
import PolicyAPI from './utils/PolicyAPI';
import ListItem from './components/ListItem/ListItem.component';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			policyName: 'fire',
			stateAbbv: 'AL',
			carrierList: [],
			isCarrierList: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		console.log(event.target.value);
		this.setState({ [event.target.id]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		const { policyName, stateAbbv } = this.state;
		let query = { name: policyName, state: stateAbbv };
		PolicyAPI.searchPolicy(query)
			.then((response) => {
				this.setState({ carrierList: response.data.carriers, isCarrierList: true });
			})
			.catch((e) => {
				console.log(e);
			});
	}

	render() {
		const { policyName, stateAbbv, isCarrierList, carrierList } = this.state;

		let stateList = [
			'AL',
			'AR',
			'AZ',
			'CA',
			'CO',
			'GA',
			'FL',
			'IA',
			'KS',
			'KY',
			'IL',
			'IN',
			'MD',
			'MI',
			'MO',
			'NC',
			'NV',
			'NY',
			'OH',
			'OK',
			'PA',
			'SD',
			'SC',
			'TN',
			'TX',
			'VA',
			'WI'
		];
		let optionStateList = [];
		for (let i = 0; i < stateList.length; i++) {
			optionStateList.push(
				<option key={stateList[i]} value={stateList[i]}>
					{stateList[i]}
				</option>
			);
		}
		return (
			<div className="page-container">
				<div className="content-wrap">
					<Header />
					<div className="main-content-wrapper">
						<div className="body-container">
							<Card style={{ padding: '2%' }}>
								<Form>
									<Row>
										<Col>
											<Form.Label>Select Policy</Form.Label>
											<Form.Control as="select" value={policyName} id="policyName" onChange={this.handleChange}>
												<option value="fire">Fire</option>
												<option value="auto">Auto</option>
												<option value="both">Both</option>
												<option value="flood">Flood</option>
												<option value="state_apt">State Apt</option>
											</Form.Control>
										</Col>
										<Col>
											<Form.Label>Select State</Form.Label>
											<Form.Control as="select" value={stateAbbv} id="stateAbbv" onChange={this.handleChange}>
												{optionStateList}
											</Form.Control>
										</Col>
										<div className="button-wrapper">
											<Button variant="success" onClick={this.handleSubmit}>
												Search
											</Button>
										</div>
									</Row>
								</Form>
							</Card>
							<div>
								{isCarrierList ? (
									<ListItem carrierList={carrierList} />
								) : (
									<div style={{ textAlign: 'center' }}>
										<h5>Go Ahead, Search and Get Results</h5>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
