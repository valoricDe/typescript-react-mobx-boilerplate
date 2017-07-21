import '../styles/index';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './app';
import routeProvider from './routeProvider';


const renderApp = routeProvider => {
	render(
		<AppContainer>
			<App routes={routeProvider} />
		</AppContainer>,
		document.getElementById(process.env.root)
	);
};

renderApp(routeProvider);

if (module.hot) {
	module.hot.accept('./routeProvider', () => {
		const newRouteProvider = require('./routeProvider').default;
		renderApp(newRouteProvider);
	});
}