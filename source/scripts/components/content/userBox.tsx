import * as React from 'react';
import { Component } from 'react';
import * as Relay from 'react-relay';
import Link from "react-router/lib/Link";
import Card from  'reactstrap/lib/Card';

import '../../../styles/components/userBox';

class UserBoxComponent extends Component<Props.IUserProps, void> {
	public render(): JSX.Element {
		const item = this.props.store;

		return (
			<Card
				className={"userBox "+(this.props.className ? this.props.className : '')}
				title={"User asked "+(item.questionsByAuthor.totalCount ? item.questionsByAuthor.totalCount : 'no')+" question(s) yet"}
				{...this.props.card}
			>
				<small>Asked By</small>
				<p><Link to={'/user/'+item.username}>{item.username}</Link></p>
			</Card>
		);
	}
}

const UserBox = Relay.createContainer(UserBoxComponent, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
    		fragment on User {
				username
				questionsByAuthor {
					totalCount
				}
			}`,
	},
});

export default UserBox;