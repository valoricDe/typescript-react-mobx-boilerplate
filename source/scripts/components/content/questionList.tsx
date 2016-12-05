import React, { Component } from 'react';
import Relay from 'react-relay';
import {Input} from "formsy-react-components";
import Formsy from 'formsy-react';
import Clearfix from "react-bootstrap/lib/Clearfix";
import QuestionBox from "./questionBox";

class QuestionListClass extends Component<Props.IQuestionListProps, void> {

	public render(): JSX.Element {
		const query = this.props.relay.variables.query;
		const querySearch = !!this.props.store.searchQuestions;
		const questions = this.props.store.searchQuestions ? this.props.store.searchQuestions : this.props.store.allQuestions;

		let items = questions.edges.map(
			(edge, idx) => <QuestionBox store={edge.node} user={this.props.store} key={idx} />
		);

		return (
			<div>
				<h2 className="page-header">{querySearch ? 'Questions with "'+query+'" in title or description' : 'Newest Questions'}</h2>
				<Formsy.Form className="col-md-4 input-group pull-right" onValidSubmit={(item) => this.props.relay.setVariables({query: item.query})}>
					<Input label="Search for: " name="query" value="" layout="elementOnly" />
					<span className="input-group-btn">
						<input type="submit" className="btn btn-default btn-group" name="submit_search" value="Search" />
					</span>
				</Formsy.Form>
				<Clearfix />
				<p>&nbsp;</p>
				{ items }
				<p>With a total of {questions.totalCount}</p>
			</div>
		);
	};
};

const QuestionList = Relay.createContainer(QuestionListClass, {
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
		store: (vars) => {
			return Relay.QL`
    		fragment on Query {
    			searchQuestions(search: $query, first: 20) @include(if: $queryIsTruthy) {
    				totalCount
					edges {
						node {
							${QuestionBox.getFragment('store')}
						}
					}
    			}
				allQuestions(first: 20) {
					totalCount
					edges {
						node {
							${QuestionBox.getFragment('store')}
						}
					}
				}
                ${QuestionBox.getFragment('user')}
			}`
		},
	},
});

export default QuestionList;
