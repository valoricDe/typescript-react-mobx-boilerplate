import React from 'react';
import { render } from 'react-dom';
import {RootContainer} from 'react-relay';

//const g = require('../../misc/settings').graphql;
import App, {AppQueries} from './components/app';
import EventHandler = React.EventHandler;

//import createStores from './main/create-stores';

//const stores: Stores.IStores = createStores();
//<App {...stores} />


// done in webpack config
//Relay.injectNetworkLayer(
// new Relay.DefaultNetworkLayer('http://'+g.host+':'+g.port+'/graphql', {})
//);

render(
		<RootContainer
			Component={App}
			route={new AppQueries()}
			renderFailure={function(error, retry: EventHandler<any>) {
				return (
					<div>
						<p>{error.message}</p>
						<p><button onClick={retry}>Retry?</button></p>
					</div>
				);
			}} />,
	document.getElementById(process.env.root)
);
