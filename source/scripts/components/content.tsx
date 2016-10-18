import React, { Component } from 'react';
import { observer } from 'mobx-react';

import Center from './common/center';

import Label from './content/label';
import Button from './content/button';
import Footer from './content/footer';

@observer
export default class Content extends Component<Props.Content.IContent, void> {
	private handleIncrement: Types.THandle = (): void => {
		let tick = this.props.tickStore.models.values().next().value;
		if(tick) {
			tick.increment();
		}
	};

	private handleDecrement: Types.THandle = (): void => {
		let tick = this.props.tickStore.models.values().next().value;
		if(tick) {
			tick.decrement();
		}
	};

	public render(): JSX.Element {
		let ticks = this.props.tickStore.models.values().next();
		return (
			<div className='content'>
				<Center>
					<Label value={ticks.value ? ticks.value.value : ""} />
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
