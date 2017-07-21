import * as React from 'react';
import {Component} from 'react';
import * as Relay from 'react-relay';
import {Input} from "formsy-react-components";
import Formsy from 'formsy-react';
import Answer from "./answer";
import Link from "react-router/lib/Link";

class AnswersListClass extends Component<Props.IAnswerListProps, void> {

	public render(): JSX.Element {
		const query = this.props.relay.variables.query;
		const querySearch = !!this.props.store.answerSearch;
		const answers = this.props.store.answerSearch ? this.props.store.answerSearch : this.props.store.answersOrderedByVote;
		const questionId = this.props.store.rowId;

		let items = answers.edges.map(
			(edge, idx) => <Answer store={edge.node} key={idx} />
		);

		return (
			<div>
				<h2 className="page-header">{querySearch ? 'Answers with "'+query+'" in title or description' : 'Answers'}</h2>
				<Formsy.Form className="col-md-4 input-group float-right" onValidSubmit={(item) => this.props.relay.setVariables({query: item.query})}>
					<Input label="Search for: " name="query" value="" layout="elementOnly" />
					<span className="input-group-btn">
						<input type="submit" className="btn btn-default btn-group" name="submit_search" value="Search" />
					</span>
				</Formsy.Form>
				<p>This question has {answers.totalCount} answer(s).</p>
				<p>&nbsp;</p>
				{ items }
				<Link to={"/questions/"+questionId+"/addAnswer"}>Add your own Answer</Link>
			</div>
		);
	};
};

const AnswersList = Relay.createContainer(AnswersListClass, {
	initialVariables: {
		query: null
	},
	prepareVariables: vars => {
		vars['queryIsTruthy'] = !!vars['query'];
		return vars;
	},
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin when we browserify.
		store: () => {
			return Relay.QL`
    		fragment on Question {
    			rowId
    			answerSearch(search: $query, first: 20) @include(if: $queryIsTruthy) {
    				totalCount
					edges {
						node {
							${Answer.getFragment('store')}
						}
					}
    			}
                answersOrderedByVote(first: 20) @skip(if: $queryIsTruthy) {
					totalCount
					edges {
						node {
							${Answer.getFragment('store')}
						}
					}
				}
			}`
		},
	},
});

export default AnswersList;
