import React, {Component} from 'react';
import Relay from 'react-relay';
import Link from "react-router/lib/Link";

class UserBoxComponent extends Component<Props.IUserProps, void> {
	public render(): JSX.Element {
		const item = this.props.store;

		return (
			<div>
				Username: <Link to={'/user/'+item.username}>{item.username}</Link>
				<p>User asked {item.questionsByAuthor.totalCount ? item.questionsByAuthor.totalCount : 'no'} question(s) yet.</p>
			</div>
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