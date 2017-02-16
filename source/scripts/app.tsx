import * as React from 'react';
import EventHandler = React.EventHandler;
import injectTapEventPlugin from 'react-tap-event-plugin';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import Router from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory'
import useRelayRouter from 'react-router-relay';

const Auth = require('./lib/auth');
import routeProvider from './routeProvider';

const RelayRouter: any = Router;

// Needed for onTouchTap (instant click on mobile), Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

/*

 Wrapp the routes in another component so you can use the state to trigger
 react render every time the environment changes
 */

export default class App extends React.Component<any, any> {
	constructor(props){
		super(props);
		this.state = {environment: Auth.getEnvironment()};
		Auth.afterLogin = () => this.resetRelayEnvironment();
		Auth.afterLogout = () => this.resetRelayEnvironment();
		Auth.onTokenError = ()=> this.handleLoginTokenError();
	}

	resetRelayEnvironment(){
		this.setState({environment: Auth.getEnvironment()});
	}

	handleLoginTokenError(){
		browserHistory.replace('/login');
	}

	render(){
		return (
			<RelayRouter
				history={browserHistory}
				render={applyRouterMiddleware(useRelayRouter)}
				environment={this.state.environment}
			>
				{this.props.routes(this.state)}
			</RelayRouter>
		);
	}
}