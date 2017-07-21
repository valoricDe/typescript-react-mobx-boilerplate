import * as React from 'react';
import { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import * as Relay from 'react-relay';
import Navbar from 'reactstrap/lib/Navbar';
import Nav from 'reactstrap/lib/Nav';
import NavDropdown from 'reactstrap/lib/NavDropdown';
import PlainLi from "./helpers/PlainLi";
import Auth from '../lib/auth';
import NavbarToggler from "reactstrap/lib/NavbarToggler";
import NavbarBrand from "reactstrap/lib/NavbarBrand";
import Collapse from "reactstrap/lib/Collapse";
import NavLink from "reactstrap/lib/NavLink";
import DropdownMenu from "reactstrap/lib/DropdownMenu";
import DropdownItem from "reactstrap/lib/DropdownItem";
import NavItem from "reactstrap/lib/NavItem";
import DropdownToggle from "reactstrap/lib/DropdownToggle";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {routerClickHelper} from "../lib/routerClickHelper";

import "../../styles/components/layout.scss";



@observer
class AppClass extends Component<Props.IAppProps, void> {

	@observable navBarOpen = false;
	@observable navBarDropDownOpen = false;

	private renderDevTools(): JSX.Element | null {
		/*if (process.env.NODE_ENV !== 'production') {
			return <DevTools />;
		}*/
		return null;
	};


	@action toggleNavBar = () => {
		this.navBarOpen = !this.navBarOpen;
	};

	@action toggleNavBarDropDown = () => {
		this.navBarDropDownOpen = !this.navBarDropDownOpen;
	};

	public render(): JSX.Element {
		Auth.setCurrentUser(this.props.store.currentUser);

		const href = (to) => routerClickHelper(to, null, this.props.router);

		return (
				<div className='wrapper'>
					{this.renderDevTools()}
					<Navbar color="faded" light toggleable>
						<NavbarToggler right onClick={this.toggleNavBar} />
						<NavbarBrand href="/">politbase</NavbarBrand>
						<Collapse navbar isOpen={this.navBarOpen}>
							<Nav className="ml-auto" navbar>
								<NavLink {...href('/home')}>Tour</NavLink>
								<NavItem><NavLink {...href('/questions/add')}>Ask Question</NavLink></NavItem>
								<NavItem><NavLink {...href('/questions')}>Questions</NavLink></NavItem>
								<NavItem><NavLink {...href('/tags')}>Tags</NavLink></NavItem>
								{!this.props.store.currentUser ?
									[
										<NavItem key="register"><NavLink {...href('/register')}>Register</NavLink></NavItem>,
										<NavItem key="divider" className="layout-divider"> / </NavItem>,
										<NavItem key="login"><NavLink {...href('/login')}>Log in</NavLink></NavItem>
									] :
									<NavDropdown isOpen={this.navBarDropDownOpen} toggle={this.toggleNavBarDropDown}>
										<DropdownToggle nav caret>
											{'User: '+this.props.store.currentUser.username}
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem {...href('/user')}>User profile</DropdownItem>
											<DropdownItem divider />
											<DropdownItem {...href('/logout')}>Logout</DropdownItem>
										</DropdownMenu>
									</NavDropdown>
								}
							</Nav>
						</Collapse>
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
