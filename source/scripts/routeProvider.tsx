import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

const Auth = require('./lib/auth');
import App, {AppQueries} from "./components/app";
import QuestionList from "./components/content/questionList";
import {QuestionListState} from "./components/content/questionList";
import HomePage from "./components/pages/homePage";
import {HomePageState} from "./components/pages/homePage";
import RegisterUser from "./components/content/registerUser";
import LoginUser from "./components/content/loginUser";
import CreateQuestion from "./components/content/createQuestion";
import User from "./components/content/user";
import {UserQueries} from "./components/content/user";
import Component = React.Component;

const queries = AppQueries.queries;
const userQueries = UserQueries.queries;

// function requireAuth(prevState, nextState, replace) {
function requireAuth(nextState, replace) {
	if (!Auth.loggedIn()) {
		replace({
			pathname: "/login",
			state: { nextPathname: nextState.location.pathname }
		})
	}
}

function requireAuthToHomepage(nextState, replace) {
	if (!Auth.loggedIn()) {
		replace({
			pathname: "/login",
			state: { nextPathname: nextState.location.pathname }
		})
	}
}

function verifySession(nextState, replace){
	if(Auth.loggedIn())
		replace({ pathname: "/admin" })
}

function logout(nextState, replace){
	Auth.logout(replace({ pathname: "/" }));
}


const RelayRoute: any = Route;
const RelayIndexRoute: any = IndexRoute;

function logComponent(Component) {
	console.log('Route', Component.props);
	return Component;
}

export default (state) => (
	<RelayRoute
		path="/" component={App} queries={queries}
		render={({ props }) => props ? logComponent(<App {...props} relay={state.environment} />) : <div>Loading ...</div>} >
		<RelayIndexRoute
			component={QuestionList} queries={queries} onEnter={requireAuthToHomepage}
			render={({ props }) => props ? logComponent(<QuestionList {...props} relay={state.environment} _state={new QuestionListState()} />) : <div>Loading...</div>} />
		<RelayRoute path="/home" component={HomePage} queries={queries}
					render={({ props }) => props ? logComponent(<HomePage {...props} _state={new HomePageState()} />) : <div>Loading...</div>} />
		<RelayRoute path="/questions" component={QuestionList} queries={queries} onEnter={requireAuth}
					render={({ props }) => props ? logComponent(<QuestionList {...props} relay={state.environment} _state={new QuestionListState()} />) : <div>Loading...</div>} />
		<RelayRoute path="/questions/add" component={CreateQuestion} questies={queries} onEnter={requireAuth} />
		<RelayRoute path="/register" component={RegisterUser}
					render={({ props }) => props ? logComponent(<RegisterUser {...props} relay={state.environment} />) : <div>Loading...</div>} />
		<RelayRoute path="/login" component={LoginUser} onEnter={verifySession}
					render={({ props }) => props ? logComponent(<LoginUser {...props} relay={state.environment} />) : <div>Loading...</div>} />
		<RelayRoute path="/logout" onEnter={logout} />
		<RelayRoute path="/user" component={User} queries={userQueries} />
	</RelayRoute>
);