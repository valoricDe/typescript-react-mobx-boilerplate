import React, {Component} from 'react';
import Relay from 'react-relay';

class AuthorProfileComponent extends Component<Props.IAuthorProfileProps, void> {
	public render(): JSX.Element {
		const item = this.props.store;

		return (
			<div>
				Author: <u><a href={'/users/'+item.id}>{item.username}</a></u>
			</div>
		);
	}
}

const AuthorProfile = Relay.createContainer(AuthorProfileComponent, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
    		fragment on User {
				id
				username
			}`,
	},
});

export default AuthorProfile;