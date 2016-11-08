import React, {Component} from 'react';
import Relay from 'react-relay';

class UserComponent extends Component<Props.IUserProps, void> {
	public render(): JSX.Element {
		const item = this.props.store;

		return (
			<div>
				Username: <u>{item.username}</u>
				<ul>
					{item.questionsByAuthor.edges.map(edge => <li key={edge.node.id}>{edge.node.title}</li>)}
				</ul>
				<p>User asked {item.questionsByAuthor.totalCount ? item.questionsByAuthor.totalCount : 'no'} question(s) yet.</p>
			</div>
		);
	}
}

const User = Relay.createContainer(UserComponent, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
    		fragment on User {
				username
				questionsByAuthor(first:50) {
					totalCount
					edges {
						node {
							id
							title
						}
					}
				}
			}`,
	},
});

export default User;