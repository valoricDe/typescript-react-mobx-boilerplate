import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

//import Content from './content';
import Relay from 'react-relay';
import Question from "./question";
import CreateQuestion from "./createQuestion";
import CreateQuestionMutation from "../../mutations/createQuestion";
import {observable} from "mobx";
import {observer} from "mobx-react";

export class QuestionListState {
	@observable addQuestion = false;
}

@observer
class QuestionListClass extends Component<Props.IQuestionListProps, void> {

	cancelNewQuestion = () => {
		this.props._state.addQuestion = false;
	};

	createQuestion = (item) => {
		this.props.relay.commitUpdate(
			new CreateQuestionMutation({store: this.props.store, newItem: item})
		);
	};

	public render(): JSX.Element {
		let items = this.props.store.allQuestions.edges.map(
			(edge, idx) => <Question store={edge.node} key={idx} />
		);

		return (
			<div>
				{this.props._state.addQuestion ? <CreateQuestion save={this.createQuestion} close={this.cancelNewQuestion}/> : null}
				{ items }
				<p>With a total of {this.props.store.allQuestions.totalCount}</p>
			</div>
		);
	};
};

const QuestionList = Relay.createContainer(QuestionListClass, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin when we browserify.
		store: () => Relay.QL`
    		fragment on Query {
				allQuestions(last: 1) {
					totalCount
					edges {
						node {
							${Question.getFragment('store')}
						}
					}
				}
				${CreateQuestionMutation.getFragment('store')}
			}`,
	},
});

export default QuestionList;
