import * as React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';

const Auth = require('./lib/auth');
import App, {AppQueries} from "./components/app";
import QuestionList from "./components/content/questionList";
import HomePage from "./components/pages/homePage";
import RegisterUser from "./components/content/registerUser";
import LoginUser from "./components/content/loginUser";
import CreateQuestion from "./components/content/createQuestion";
import User from "./components/content/user";
import {UserQueries} from "./components/content/user";
import Component = React.Component;
import {CurrentUserQueries} from "./components/content/user";
import {QuestionQueries, default as Question} from "./components/content/question";
import CreateAnswer from "./components/content/createAnswer";

const queries = AppQueries.queries;
const userQueries = UserQueries.queries;
const currentUserQueries = CurrentUserQueries.queries;
const questionQueries = QuestionQueries.queries;

// function requireAuth(prevState, nextState, replace) {
function requireAuth(nextState, replace) {
	if (!Auth.loggedIn()) {
		Auth.logout();
		replace({
			pathname: "/login",
			state: { nextPathname: nextState.location.pathname }
		})
	}
}

function requireAuthToHomepage(nextState, replace) {
	if (!Auth.loggedIn()) {
		Auth.logout();
		replace({
			pathname: "/home",
			state: { nextPathname: nextState.location.pathname }
		})
	}
}

function verifySession(nextState, replace){
	if(Auth.loggedIn())
		replace({ pathname: "/home" })
}

function logout(nextState, replace){
	Auth.logout(() => replace({ pathname: "/" }));
}


const RelayRoute: any = Route;
const RelayIndexRoute: any = IndexRoute;

function logComponent(Component) {
	console.log('Route', Component.props);
	return Component;
}

export default ({environment}) => (
	<RelayRoute
		path="/" component={App} queries={queries}
		render={({ props }) => {document.body.className = props ? 'auto' : 'wait'; return props ? <App {...props} /> : undefined} }>
		<RelayIndexRoute component={QuestionList} queries={queries} onEnter={requireAuthToHomepage} />
		<RelayRoute path="home" component={HomePage} queries={queries} />
		<RelayRoute path="questions" component={QuestionList} queries={queries} onEnter={requireAuth} />
		<RelayRoute path="questions/add" component={CreateQuestion} queries={queries} onEnter={requireAuth} />
		<RelayRoute path="questions/:id" component={Question} queries={questionQueries} onEnter={requireAuth} />
		<RelayRoute path="questions/:id/addAnswer" component={CreateAnswer} queries={queries} onEnter={requireAuth} />
		<RelayRoute path="register" component={RegisterUser} />
		<RelayRoute path="login" component={LoginUser} onEnter={verifySession} />
		<RelayRoute path="logout" onEnter={logout} />
		<RelayRoute path="user" component={User} queries={currentUserQueries} />
		<RelayRoute path="user/:username" component={User} queries={userQueries} />
	</RelayRoute>
);