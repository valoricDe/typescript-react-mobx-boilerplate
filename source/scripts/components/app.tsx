import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import Relay from 'react-relay';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Link from "react-router/lib/Link";

import QuestionList, {QuestionListState} from "./content/questionList";


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
					<Navbar staticTop collapseOnSelect>
						<Navbar.Header>
							<Navbar.Brand>
								<a href="#">PolitBase</a>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav pullRight>
								<NavItem href="/questions">Questions</NavItem>
								{this.props.store.currentUser == null ?
									<Navbar.Text>
										<Link to="/register">Register</Link>
										<span> / </span>
										<Link to="/login">Log in</Link>
									</Navbar.Text> :
									<Navbar.Text><Link to="/user">User: {this.props.store.currentUser.username}</Link></Navbar.Text>
								}
							</Nav>
						</Navbar.Collapse>
					</Navbar>

					<div className="content">{this.props.children}</div>
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
