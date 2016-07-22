import * as React from 'react';
import { observer, inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Center from './common/center';
import Label from './common/label';
import Button from './common/button';
import Footer from './common/footer';

@inject((stores: Store.IStores): Props.IApp => (stores))
@observer
export default class App extends React.Component<Props.IApp, {}> {
	private renderDevTools(): JSX.Element | number {
		if (process.env.NODE_ENV !== 'production') {
			return <DevTools />;
		}

		return null;
	}

	private incrementButtonOnClick = (): void => {
		this.props.tickStore.model.increment();
	}

	private decrementButtonOnClick = (): void => {
		this.props.tickStore.model.decrement();
	}

	public render(): JSX.Element {
		return (
			<div className='wrapper'>
				{this.renderDevTools()}
				<Center>
					<Label value={this.props.tickStore.model.value} />
					<Button className='increment' caption='++' onClick={this.incrementButtonOnClick} />
					<Button className='decrement' caption='--' onClick={this.decrementButtonOnClick} />
					<Footer />
				</Center>
			</div>
		);
	}
}
