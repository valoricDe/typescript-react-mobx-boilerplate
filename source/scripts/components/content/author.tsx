import React, {Component} from 'react';
import Relay from 'react-relay';

class AuthorClass extends Component<Props.Content.IQuestion, void> {
	public render(): JSX.Element {
		const item = this.props.store;

		return (
			<div>
				<u><a href={item.id}>{item.rowId}: {item.username}</a></u>
			</div>
		);
	}
}

const Author = Relay.createContainer(AuthorClass, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
    		fragment on User {
				id
				rowId
				username
			}`,
	},
});

export default Author;