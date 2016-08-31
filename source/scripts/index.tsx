import React from 'react';
import { render } from 'react-dom';

import App from './components/app';

import createStores from './main/create-stores';

const stores: Store.IStores = createStores();

render(
	<App {...stores} />,
	document.getElementById(process.env.root)
);
