import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';

import App from './components/app';

import createStores from './main/create-stores';

const stores: IStores = createStores(0);

render(
	<Provider {...stores}>
		<App />
	</Provider>,
	document.getElementById('root')
);
