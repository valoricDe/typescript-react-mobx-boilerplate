import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';

import Content from './content';

export default class App extends Component<Props.IApp, void> {
	private renderDevTools(): JSX.Element | null {
		if (process.env.NODE_ENV !== 'production') {
			return <DevTools />;
		}

		return null;
	};

	public render(): JSX.Element {
		return (
			<div className='wrapper'>
				{this.renderDevTools()}
				<Content {...this.props} />
			</div>
		);
	};
};
