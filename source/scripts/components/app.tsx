import * as React from 'react';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Center from './common/center';
import Label from './common/label';
import Button from './common/button';

@inject((stores: IStores): Props.IApp => (stores))
@observer
export default class App extends React.Component<Props.IApp, {}> {
	private renderDevTools(): JSX.Element | number {
		if (process.env.NODE_ENV !== 'production') {
			return <DevTools />;
		}

		return null;
	}

	private buttonOnClick = (): void => {
		this.props.tickStore.increment();
	}

	public render(): JSX.Element {
		const { tick }: { tick: number } = this.props.tickStore;

		return (
			<div className='wrapper'>
				{this.renderDevTools()}
				<Center>
					<Label value={tick} />
					<Button onClick={this.buttonOnClick} />
				</Center>
			</div>
		);
	}
}
