import * as React from 'react';
import {Component} from "react";

export default class PlainLi extends Component<any, void> {
	public render(): JSX.Element {
		return <li>{this.props.children}</li>
	}
}