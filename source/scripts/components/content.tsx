import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Center from './common/center';

import Label from './content/label';
import Button from './content/button';
import Footer from './content/footer';

@observer
export default class Content extends Component<Props.IContent, {}> {
	private handleIncrement = (): void => this.props.tick.increment();

	private handleDecrement = (): void => this.props.tick.decrement();

	public render(): JSX.Element {
		return (
			<div className='content'>
				<Center>
					<Label value={this.props.tick.value} />
					<Button
						type='increment'
						caption='++'
						onClick={this.handleIncrement} />
					<Button
						type='decrement'
						caption='--'
						onClick={this.handleDecrement} />
					<Footer />
				</Center>
			</div>
		);
	};
};
