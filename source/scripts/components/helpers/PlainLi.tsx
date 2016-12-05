import React from "react";
import Component = React.Component;

export default class PlainLi extends Component<any, void> {
	public render(): JSX.Element {
		return <li>{this.props.children}</li>
	}
}