import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

//import Content from './content';
import Relay from 'react-relay';
import {observer} from "mobx-react";
//import {RegisterUserState} from "../content/registerUser";


export class HomePageState {
	//registerUser = new RegisterUserState()
}

@observer
class HomePageClass extends Component<Props.IUserListProps, void> {

	cancelNewEntry = () => {
		this.props._state.addEntry = false;
	};

	public render(): JSX.Element {
		console.log('rendering HomePage');
		return (
			<div>
				hello
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
