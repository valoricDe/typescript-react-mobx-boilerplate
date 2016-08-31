import React, { Component } from 'react';

export default class Button extends Component<Props.Content.IButton, {}> {
	private shouldComponentUpdate(nextProps: Props.Content.IButton): boolean {
		return this.props.caption !== nextProps.caption;
	};

	public render(): JSX.Element {
		const { caption, type, onClick }: Props.Content.IButton = this.props;

		return (
			<button
				className={`content__button content__button--${type}`}
				onClick={onClick}>
				{caption}
			</button>
		);
	};
};
