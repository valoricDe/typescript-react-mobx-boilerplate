import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import App, {AppQueries} from "./components/app";
import QuestionList from "./components/content/questionList";
import {QuestionListState} from "./components/content/questionList";
import HomePage from "./components/pages/homePage";
import {HomePageState} from "./components/pages/homePage";

const queries = AppQueries.queries;

const RelayRoute: any = Route;
const RelayIndexRoute: any = IndexRoute;

export default ({token}) => (
	<RelayRoute
		path="/" component={App} queries={queries}
	>
		{token ?
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
);