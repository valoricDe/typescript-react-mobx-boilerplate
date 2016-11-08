import React from 'react';
import { render } from 'react-dom';
import EventHandler = React.EventHandler;
import injectTapEventPlugin from 'react-tap-event-plugin';
import Relay from 'react-relay';
import RootContainer from 'react-relay/lib/RelayRootContainer';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import browserHistory from 'react-router/lib/browserHistory'
import useRelayRouter from 'react-router-relay';

import routeProvider from './routeProvider';
import RelayNetworkLayer from "./RelayNetworkLayer";
import {AppQueries, default as App, AppState} from "./components/app";
import HomePage from "./components/pages/homePage";
import {HomePageState} from "./components/pages/homePage";
import QuestionList from "./components/content/questionList";
import {QuestionListState} from "./components/content/questionList";
import RegisterUser from "./components/content/registerUser";
import LoginUser from "./components/content/loginUser";
import {RegisterUserState} from "./components/content/registerUser";

// Needed for onTouchTap (instant click on mobile), Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var token = localStorage.getItem('jwtToken');

const g = require('../../misc/settings').graphql;
Relay.injectNetworkLayer(
	new RelayNetworkLayer('http://'+g.host+':'+g.port+'/graphql', {
		headers: (token ? {
			Authorization: 'Bearer ' + token
		} : {}),
		onError: (error, init) => {
			console.log(error);
			if((error.status == 400 || error.status == 500) && token) {
				localStorage.removeItem('jwtToken');
				delete init.headers['Authorization'];
				console.log('removed token');
				return true;
			}
			return false;
		}
	})
);

const RelayRouter: any = Router;

const queries = AppQueries.queries;

const RelayRoute: any = Route;
const RelayIndexRoute: any = IndexRoute;

const root = <RootContainer
	Component={App}
	route={new AppQueries()}
	renderLoading={function() {
				return <div>Loading...</div>;
			}}
	renderFetched={data => <App {...data} _state={new AppState()} />}
	renderFailure={function(error, retry: EventHandler<any>) {
				const registerUserState = new RegisterUserState();
				registerUserState.show = true;
				return (
					<div>
						<p>{error.message}</p>
						<p><LoginUser /></p>
						<p><RegisterUser _state={registerUserState} relay={Relay.Store} /></p>
						<p><button onClick={retry}>Retry?</button></p>
					</div>
				);
			}} />;

const router = (
	<RelayRouter
		history={browserHistory}
		render={applyRouterMiddleware(useRelayRouter)}
		environment={Relay.Store}
	>
		<RelayRoute
			path="/" component={App} queries={queries}
		>
			{!token ?
				<RelayIndexRoute
					component={HomePage} queries={queries}
					render={({ props }) => props ? <HomePage {...props} _state={new HomePageState()} /> : <div>Loading...</div>}
				/>:
				<RelayIndexRoute
					component={QuestionList} queries={queries}
					render={({ props }) => props ? <QuestionList {...props} _state={new QuestionListState()} /> : <div>Loading...</div>}
				/>
			}
			<RelayRoute path="/questions" component={QuestionList} queries={queries} />
		</RelayRoute>
	</RelayRouter>
);

render(router, document.getElementById(process.env.root));
