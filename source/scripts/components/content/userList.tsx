import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

//import Content from './content';
import Relay from 'react-relay';
import Question from "./question";
import CreateQuestion from "./createQuestion";
import CreateQuestionMutation from "../../mutations/createQuestion";
import {observable} from "mobx";
import {observer} from "mobx-react";
import User from "./user";
import RegisterUser from "./registerUser";
import RegisterUserMutation from "../../mutations/registerUser";
import {RegisterUserState} from "./registerUser";

export class UserListState {
	registerUser = new RegisterUserState()
}

@observer
class UserListClass extends Component<Props.IUserListProps, void> {

	cancelNewEntry = () => {
		this.props._state.addEntry = false;
	};

	public render(): JSX.Element {
		let items = this.props.store.allUsers.edges.map(
			(edge, idx) => <User store={edge.node} key={idx} />
		);

		return (
			<div>
				<RegisterUser _state={this.props._state.registerUser}/>
				{ items }
				<p>With a total of {this.props.store.allUsers.totalCount}</p>
			</div>
		);
	};
};

const UserList = Relay.createContainer(UserListClass, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin when we browserify.
		store: () => Relay.QL`
    		fragment on Query {
				allUsers(last: 1) {
					totalCount
					edges {
						node {
							${User.getFragment('store')}
						}
					}
				}
			}`,
	},
});

export default UserList;
