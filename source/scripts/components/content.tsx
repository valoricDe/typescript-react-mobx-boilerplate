import * as React from 'react';

import Center from './common/center';

import Label from './content/label';
import Button from './content/button';
import Footer from './content/footer';

export default class Content extends React.Component<Props.IContent, {}> {
	private incrementButtonOnClick = (): void => {
		this.props.model.increment();
	}

	private decrementButtonOnClick = (): void => {
		this.props.model.decrement();
	}

	public render(): JSX.Element {
		return (
			<div className='content'>
				<Center>
					<Label value={this.props.model.value} />
					<Button
						className='content__button content__button--increment'
						caption='++'
						onClick={this.incrementButtonOnClick} />
					<Button
						className='content__button content__button--decrement'
						caption='--'
						onClick={this.decrementButtonOnClick} />
					<Footer />
				</Center>
			</div>
		);
	}
}
