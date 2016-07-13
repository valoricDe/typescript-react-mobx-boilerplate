import * as React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import Center from './center';
import Label from './label';
import Button from './button';

@observer
export default class App extends React.Component<Props.IApp, {}> {
	private renderDevTools(): JSX.Element | any {
		if (process.env.NODE_ENV !== 'production') {
			return <DevTools />;
		}

		return null;
	}

	private buttonOnClick = (): void => {
		this.props.store.increment();
	}

	public render(): JSX.Element {
		const { tick } = this.props.store;

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
