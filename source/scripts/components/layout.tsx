import * as React from 'react';
import { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import * as Relay from 'react-relay';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import PlainLi from "./helpers/PlainLi";
import Auth from '../lib/auth';

class AppClass extends Component<Props.IAppProps, void> {

	private renderDevTools(): JSX.Element | null {
		/*if (process.env.NODE_ENV !== 'production') {
			return <DevTools />;
		}*/
		return null;
	};

	public render(): JSX.Element {
		Auth.setCurrentUser(this.props.store.currentUser);

		const href = (target) => {
			return {onClick: (event) => {
				event.preventDefault();
				event.stopPropagation();
				this.props.router.push(target);
				return false;
			}, href: target, key: target};
		};

		return (
				<div className='wrapper'>
					{this.renderDevTools()}
					<Navbar staticTop collapseOnSelect>
						<Navbar.Header>
							<Navbar.Brand>
								<a href="/home">PolitBase</a>
							</Navbar.Brand>
							<Navbar.Toggle />
						</Navbar.Header>
						<Navbar.Collapse>
							<Nav pullRight>
								<NavItem {...href('/questions/add')}>Ask Question</NavItem>
								<NavItem {...href('/questions')}>Questions</NavItem>
								{!this.props.store.currentUser ?
									[
										<NavItem {...href('/register')} className="highlight left">Register</NavItem>,
										<PlainLi className="divider" key="divider"><p> / </p></PlainLi>,
										<NavItem {...href('/login')} className="highlight right">Log in</NavItem>
									] :
									<NavDropdown title={'User: '+this.props.store.currentUser.username} id="userDropdown">
										<MenuItem {...href('/user')}>User profile</MenuItem>
										<MenuItem divider />
										<MenuItem {...href('/logout')}>Logout</MenuItem>
									</NavDropdown>
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
    			currentUser {
					rowId
    				username
    			}
			}`,
	},
});

export default App;

export class AppQueries extends Relay.Route {
	static routeName = 'AppQueries';
	static queries = {
		store: (Component) => Relay.QL`query { query { 
			${Component.getFragment('store')}
		} }`,
	};
}
