import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import Relay from 'react-relay';
import {observer} from "mobx-react";
import {observable} from "mobx";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

import QuestionList, {QuestionListState} from "./content/questionList";
import Link from "react-router/lib/Link";

export class AppState {
}

class AppClass extends Component<Props.IAppProps, void> {

	private renderDevTools(): JSX.Element | null {
		/*if (process.env.NODE_ENV !== 'production') {
			return <DevTools />;
		}*/
		return null;
	};

	public render(): JSX.Element {
		console.log('rendering App');
		return (
				<div className='wrapper'>
					{this.renderDevTools()}
					<Navbar staticTop>
						<Navbar.Header>
							<Navbar.Brand>
								<a href="#">PolitBase</a>
							</Navbar.Brand>
						</Navbar.Header>
						<Nav className="pull-right">
							<NavItem href="/questions">Questions</NavItem>
							<NavItem eventKey={2} onClick={() => this.props._state.questionList.addQuestion = true}>Ask Question</NavItem>
							<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
								<MenuItem eventKey={3.1}>Action</MenuItem>
								<MenuItem eventKey={3.2}>Another action</MenuItem>
								<MenuItem eventKey={3.3}>Something else here</MenuItem>
								<MenuItem divider />
								<MenuItem eventKey={3.3}>Separated link</MenuItem>
							</NavDropdown>
							{this.props.store.currentUser == null ?
								<NavItem>
									<Link to="/register">Register</Link>
									<span> / </span>
									<Link to="/login">Log in</Link>
								</NavItem> :
								<NavItem><Link to="/user">User: {this.props.store.currentUser.username}</Link></NavItem>
							}
						</Nav>
					</Navbar>
					{this.props.children}
				</div>
		);
	};
};

const App = Relay.createContainer(AppClass, {
	fragments: {
		store: () => Relay.QL`
    		fragment on Query {
    			currentUser
			}`,
	},
});

export default App;

export class AppQueries extends Relay.Route {
	static routeName = 'AppQueries';
	static queries = {
		store: (Component) => Relay.QL`query { query { ${Component.getFragment('store')} } }`,
	};
}
