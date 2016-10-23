import React, {Component} from 'react';
import Relay from 'react-relay';
import Author from "./author";

class QuestionClass extends Component<Props.Content.IQuestion, void> {
	public render(): JSX.Element {
		const item = this.props.store;

		return (
			<div>
				<h1><a href={item.id}>{item.rowId}:{item.title}</a></h1>
				<p>{item.description}</p>
				<Author store={item.author} />
				<hr />
			</div>
		);
	}
}

const Question = Relay.createContainer(QuestionClass, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin.
		store: () => Relay.QL`
    		fragment on Question {
				id
				rowId
				title
				description
				author: userByAuthor {
					${Author.getFragment('store')}
				}
			}`,
	},
});

export default Question;