/**
 * Created by velten on 23.10.16.
 */
import * as Relay from 'react-relay';

export default class CreateTagSubscriptionMutation extends Relay.Mutation<any, any> {
	getMutation() {
		return Relay.QL `mutation { upsertTagSubscription }`
	}

	getVariables() {
		return {
			tagId: this.props.store.rowId,
			questions: this.props.subscribe.questions,
			subTags: this.props.subscribe.subTags,
		}
	}

	getFatQuery() {
		return Relay.QL `fragment on UpsertTagSubscriptionPayload {
			tag {
				tagSubscription
			}
		}`
	}

	getConfigs() {
		return [{
			type: "FIELDS_CHANGE",
			fieldIDs: {
				tag: this.props.store.rowId
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
		  fragment on Tag {
		  	id
		    rowId
		  }
    	`,
	};
}