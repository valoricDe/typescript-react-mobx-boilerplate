import * as React from 'react';
import { render } from 'react-dom';

import App from './components/app';
import Store from './store/index';

const store: Store = new Store(0);

render(
	<App store={store} />,
	document.getElementById('root')
);
