/**
 * Created by velten on 23.10.16.
 */
import Relay from 'react-relay';

export default class CreateQuestionMutation extends Relay.Mutation<any, any> {
	getMutation() {
		return Relay.QL `mutation { createQuestion }`
	}

	getVariables() {
		return {
			question: {
				title: this.props.newItem.title,
				description: this.props.newItem.description,
				author: this.props.store.user.rowId,
			}
		}
	}

	getFatQuery() {
		return Relay.QL `fragment on CreateQuestionPayload {
			questionEdge
			query {
				allQuestions
			}
		}`
	}

	getConfigs() {
		console.log(this.props);

		return [{
			type: 'RANGE_ADD',
			parentName: 'query',
			parentID: this.props.store.id,
			connectionName: 'allQuestions',
			edgeName: 'questionEdge',
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
		    allQuestions(last: 100) {
				totalCount
				edges
			}
			user: userByRowId(rowId: 1) {
				rowId
			}
		  }
    	`,
	};
}