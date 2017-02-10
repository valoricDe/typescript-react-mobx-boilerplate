import * as React from 'react';
import {Component} from 'react';
import DevTools from 'mobx-react-devtools';
import { Button, Jumbotron } from 'react-bootstrap';

//import Content from './content';
import * as Relay from 'react-relay';
import {observer} from "mobx-react";
//import {RegisterUserState} from "../content/registerUser";


export class HomePageState {
	//registerUser = new RegisterUserState()
}

@observer
class HomePageClass extends Component<Props.IHomePageProps, void> {
	public render(): JSX.Element {
		console.log('rendering HomePage');
		return (
			<div>
				<Jumbotron>
					<h1>Hello, world!</h1>
					<p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
					<p><Button bsStyle="primary">Learn more</Button></p>
				</Jumbotron>
			</div>
		);
	};
};

const HomePage = Relay.createContainer(HomePageClass, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin when we browserify.
		store: () => Relay.QL`
    		fragment on Query {
				currentUser
			}`,
	},
});

export default HomePage;
