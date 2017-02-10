/**
 * Created by velten on 23.10.16.
 */
import * as Relay from 'react-relay';

export default class CreateAnswerVoteMutation extends Relay.Mutation<any, any> {
	getMutation() {
		return Relay.QL `mutation { upsertAnswerVoteByQuestionAndAnswer }`
	}

	getVariables() {
		return {
			questionId: this.props.store.question,
			answerId: this.props.store.rowId,
			value: this.props.item.value,
			subscribe: this.props.item.subscribe,
		}
	}

	getFatQuery() {
		return Relay.QL `fragment on UpsertAnswerVoteByQuestionAndAnswerPayload {
			answer {
				vote
				answerVoteByCurrentUser
			}
		}`
	}

	getConfigs() {
		return [{
			type: "FIELDS_CHANGE",
			fieldIDs: {
				answer: this.props.store.id
			}
		}]
	}

	/*getOptimisticResponse() {
		return {
			questionEdge: {
				node: {
					title: this.props.newItem.title,
					description: this.props.newItem.description,
					author: this.props.store.user.id,
					userByAuthor: this.props.store.user
				},
			},
			query: {
				allQuestions: {
					totalCount: this.props.store.allQuestions.totalCount + 1,
					edges:
				}
			},
		};
	}*/

	// This mutation has a hard dependency on the question's ID. We specify this
	// dependency declaratively here as a GraphQL query fragment. Relay will
	// use this fragment to ensure that the question's ID is available wherever
	// this mutation is used.
	static fragments = {
		store: () => Relay.QL`
		  fragment on Answer {
		  	id
		    rowId
		    question
		  }
    	`,
	};
}