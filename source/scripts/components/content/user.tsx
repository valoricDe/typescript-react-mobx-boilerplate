import React, {Component} from 'react';
import Relay from 'react-relay';
import Link from "react-router/lib/Link";

class UserComponent extends Component<Props.IUserProps, void> {
	public render(): JSX.Element {
		const item = this.props.store;

		return (
			<div>
				Username: <Link to={'/user/'+item.username}>{item.username}</Link>
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

export class UserQueries extends Relay.Route {
	static routeName = 'UserQueries';
	static queries = {
		store: (Component) => Relay.QL`query { currentUser { ${Component.getFragment('store')} } }`,
	};
}

export default User;