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

const queries = AppQueries.queries;

// function requireAuth(prevState, nextState, replace) {
function requireAuth(nextState, replace) {
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

const RelayRoute: any = Route;
const RelayIndexRoute: any = IndexRoute;

export default ({}) => (
	<RelayRoute
		path="/" component={App} queries={queries}
	>
		{!Auth.loggedIn() ?
			<RelayIndexRoute
				component={HomePage} queries={queries}
				render={({ props }) => props ? <HomePage {...props} _state={new HomePageState()} /> : <div>Loading...</div>}
			/>:
			<RelayIndexRoute
				component={QuestionList} queries={queries} onEnter={requireAuth}
				render={({ props }) => props ? <QuestionList {...props} _state={new QuestionListState()} /> : <div>Loading...</div>}
			/>
		}
		<RelayRoute path="/questions" component={QuestionList} queries={queries} onEnter={requireAuth} />
		<RelayRoute path="/register" component={RegisterUser} />
		<RelayRoute path="/login" component={LoginUser} onEnter={verifySession}
					render={({ props }) => props ? <LoginUser {...props} relay={Auth.getEnvironment()} /> : <div>Loading...</div>}/>
	</RelayRoute>
);