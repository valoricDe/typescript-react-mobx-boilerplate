import * as React from 'react';
import {Component} from "react";

export default class TextDecorator extends Component<any, void> {
	getChildren = (text, decorator, decoratorProps) => {
		const matches = [];

		decorator.strategy(text, function(start, end, groupMatch) {
			matches.push({start, end, match: groupMatch.match});
		});

		matches.sort(function(a, b) { return a.start > b.start });

		const Component = decorator.component;
		const children = [];
		let lastEnd = 0;
		matches.forEach(function({start, end, match}) {
			if(lastEnd < start) {
				children.push(text.slice(lastEnd, start));
			}

			children.push(<Component {...decoratorProps(match)}/>);
			lastEnd = end;
		});

		if(lastEnd < text.length -1) {
			children.push(text.slice(lastEnd));
		}

		return children;
	}

	public render(): JSX.Element {
		const children = this.getChildren(this.props.children, this.props.decorator, this.props.decoratorProps);
		return <p>{children}</p>;
	}
}