/**
 * Created by velten on 23.10.16.
 */
import Relay from 'react-relay';

export default class CreateAnswerMutation extends Relay.Mutation<any, any> {
	getMutation() {
		return Relay.QL `mutation { createAnswer }`
	}

	getVariables() {
		return {
			answer: {
				text: this.props.newItem.text,
				question: this.props.questionId,
				author: this.props.store.currentUser.rowId,
			}
		}
	}

	getFatQuery() {
		return Relay.QL `fragment on CreateAnswerPayload {
			answer
			answerEdge
			questionByQuestion {
				answersByQuestion
			}
			query {
				allAnswers
				
			}
		}`
	}

	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			parentName: 'query',
			parentID: this.props.store.id,
			connectionName: 'allAnswers',
			edgeName: 'answerEdge',
			rangeBehaviors: {
				'': 'append',
			},
		}, {
			type: 'RANGE_ADD',
			parentName: 'query',
			parentID: this.props.store.id,
			connectionName: 'answersByQuestion',
			edgeName: 'answerEdge',
			rangeBehaviors: {
				'': 'append',
			},
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
		  fragment on Query {
		    id
			currentUser {
				rowId
			}
		  }
    	`,
	};
}