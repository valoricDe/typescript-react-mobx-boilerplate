import React, { Component } from 'react';
import Relay from 'react-relay';
import TagToken from "./tagToken";

class QuestionTagListClass extends Component<Props.IQuestionTagListProps, void> {

	public render(): JSX.Element {
		const store = this.props.store;
		return (
			<div className="bootstrap-tokenizer">
				{store.questionTagsByQuestion.edges.length ? store.questionTagsByQuestion.edges.map((e, idx) => <TagToken store={e.node.tagByTag} key={idx} />) : "No tags assigned!"}
			</div>
		);
	};
};

const QuestionTagList = Relay.createContainer(QuestionTagListClass, {
	fragments: {
		// The property name here reflects what is added to `this.props` above.
		// This template string will be parsed by babel-relay-plugin when we browserify.
		store: (vars) => {
			return Relay.QL`
                fragment on Question {
                    questionTagsByQuestion(first: 20) {
                        edges {
                            node {
                                tagByTag {
                                    ${TagToken.getFragment('store')}
                                }
                            }
                        }
                    }
                }`
		},
	},
});

export default QuestionTagList;
