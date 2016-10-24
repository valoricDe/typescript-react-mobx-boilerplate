import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap, Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

const lightMuiTheme = getMuiTheme(lightBaseTheme);

//import Content from './content';
import Relay from 'react-relay';
import Question from "./content/question";

class AppClass extends Component<Props.IApp, void> {
	private renderDevTools(): JSX.Element | null {
		if (process.env.NODE_ENV !== 'production') {
			return <DevTools />;
		}

		return null;
	};

	public render(): JSX.Element {
		let items = this.props.store.nodes.map(
			(store, idx) => <Question store={store} key={idx} />
		);

		return (
			<MuiThemeProvider muiTheme={lightMuiTheme}>
			<div className='wrapper'>
				{this.renderDevTools()}
				<div>
					{ items }
					<p>With a total of {this.props.store.totalCount}</p>
				</div>
			</div>
			</MuiThemeProvider>
		);
	};
};

const App = Relay.createContainer(AppClass, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin when we browserify.
		store: () => Relay.QL`
    		fragment on QuestionsConnection {
    			totalCount
				nodes {
					${Question.getFragment('store')}
				}
			}`,
	},
});

export default App;

export class AppQueries extends Relay.Route {
	static routeName = 'AppQueries';
	static queries = {
		store: (Component) => Relay.QL`query { allQuestions { ${App.getFragment('store')} } }`,
	};
}
