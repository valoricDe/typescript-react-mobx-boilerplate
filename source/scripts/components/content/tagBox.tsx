import * as React from 'react';
import { Component } from 'react';
import * as Relay from 'react-relay';
import Link from "react-router/lib/Link";
import Card from "reactstrap/lib/Card";

class TagBoxComponent extends Component<Props.ITagProps, void> {
	public render(): JSX.Element {
		const item = this.props.store;

		return (
			<Card block>
				<Link to={"/tags/"+item.rowId}>{item.name}</Link>
				<p>{item.description}</p>
				<p>This tag has been used in {item.questionTagXrefsByTagId.totalCount ? item.questionTagXrefsByTagId.totalCount : 'no'} question(s) yet.</p>
			</Card>
		);
	}
}

const TagBox = Relay.createContainer(TagBoxComponent, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
    		fragment on Tag {
				rowId
				name
				description
                questionTagXrefsByTagId {
					totalCount
				}
			}`,
	},
});

export default TagBox;