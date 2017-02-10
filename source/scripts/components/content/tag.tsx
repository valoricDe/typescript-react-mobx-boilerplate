import * as React from 'react';
import { Component } from 'react';
import * as Relay from 'react-relay';
import Link from "react-router/lib/Link";

class TagComponent extends Component<Props.ITagProps, void> {
	public render(): JSX.Element {
		const item = this.props.store;

		return (
			<div>
				<p>{item.name}</p>
				<p>{item.description}</p>
				<p>This tag has been used in {item.questionTagsByTag.totalCount ? item.questionTagsByTag.totalCount : 'no'} question(s) yet.</p>
			</div>
		);
	}
}

const Tag = Relay.createContainer(TagComponent, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
    		fragment on Tag {
				name
				description
                questionTagsByTag {
					totalCount
				}
			}`,
	},
});

export default Tag;