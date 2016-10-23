import React from 'react';
import { render } from 'react-dom';
import Relay from 'react-relay';

const g = require('../../misc/settings').graphql;
import App, {AppQueries} from './components/app';

//import createStores from './main/create-stores';

//const stores: Stores.IStores = createStores();
//<App {...stores} />


// done in webpack config
//Relay.injectNetworkLayer(
// new Relay.DefaultNetworkLayer('http://'+g.host+':'+g.port+'/graphql', {})
//);

render(
	<Relay.RootContainer Component={App} route={new AppQueries()}
						 onReadyStateChange={({error}) => { if (error) console.error(error) }} />,
	document.getElementById(process.env.root)
);
