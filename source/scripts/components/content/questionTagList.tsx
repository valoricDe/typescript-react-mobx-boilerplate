import * as React from 'react';
import {Component} from 'react';
import * as Relay from 'react-relay';
import TagToken from "./tagToken";

class QuestionTagListClass extends Component<Props.IQuestionTagListProps, void> {

	public render(): JSX.Element {
		const store = this.props.store;
		return (
			<div className="bootstrap-tokenizer">
				{store.questionTagXrefsByQuestionId.edges.length ? store.questionTagXrefsByQuestionId.edges.map((e, idx) => <TagToken store={e.node.tagByTagId} key={idx} />) : "No tags assigned!"}
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
                    questionTagXrefsByQuestionId(first: 20) {
                        edges {
                            node {
                                tagByTagId {
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
