import * as React from 'react';

export default class Button extends React.Component<Props.Content.IButton, {}> {
	private shouldComponentUpdate(nextProps: Props.Content.IButton): boolean {
		return this.props.caption !== nextProps.caption;
	}

	public render(): JSX.Element {
		const { caption, className, onClick }: Props.Content.IButton = this.props;

		return <button {...{className, onClick}}>{caption}</button>;
	}
}
