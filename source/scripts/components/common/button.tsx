import * as React from 'react';

export default class Button extends React.Component<Props.Common.IButton, {}> {
	private shouldComponentUpdate(nextProps: Props.Common.IButton): boolean {
		return this.props.caption !== nextProps.caption;
	}

	public render(): JSX.Element {
		const { caption, className, onClick }: Props.Common.IButton = this.props;

		return <button {...{className, onClick}}>{caption}</button>;
	}
}
