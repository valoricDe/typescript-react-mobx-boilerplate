import * as React from 'react';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Content from './content';

@inject((stores: Store.IStores): Props.IApp => (stores))
@observer
export default class App extends React.Component<Props.IApp, {}> {
	private renderDevTools(): JSX.Element | number {
		if (process.env.NODE_ENV !== 'production') {
			return <DevTools />;
		}

		return null;
	}

	public render(): JSX.Element {
		const { model }: { model: Store.Tick.IModel } = this.props.tickStore;

		return (
			<div className='wrapper'>
				{this.renderDevTools()}
				<Content model={model} />
			</div>
		);
	}
}
